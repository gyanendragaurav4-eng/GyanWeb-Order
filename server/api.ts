import { Router, Request, Response } from 'express';
import multer from 'multer';
import { getDB } from './db.js';
import { authenticateToken } from './auth.js';
import { Server } from 'socket.io';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, fieldnamePrefix(file.fieldname) + uniqueSuffix + path.extname(file.originalname));
  }
});

function fieldnamePrefix(fieldname: string) {
  if (fieldname === 'zipFile') return 'zip-';
  if (fieldname === 'paymentScreenshot') return 'payment-';
  return 'file-';
}

const upload = multer({ storage });

export function apiRouter(io: Server) {
  const router = Router();
  
  // Create an order
  router.post('/orders', authenticateToken, upload.single('zipFile'), async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      const { fullName, email, phone, websiteType, description, budget, domainName } = req.body;
      const zipFilePath = req.file ? `/uploads/${req.file.filename}` : null;
      const orderId = crypto.randomUUID();
      
      const db = getDB();
      await db.run(
        'INSERT INTO orders (id, userId, fullName, email, phone, websiteType, description, budget, domainName, zipFilePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [orderId, user.id, fullName, email, phone, websiteType, description, budget, domainName, zipFilePath]
      );
      
      res.json({ success: true, orderId });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  // Get user's orders
  router.get('/orders/my', authenticateToken, async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      const db = getDB();
      const orders = await db.all('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC', [user.id]);
      res.json(orders);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed' });
    }
  });
  
  // Get all orders (admin)
  router.get('/orders/all', authenticateToken, async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      if (user.role !== 'admin') {
         return res.status(403).json({ error: 'Forbidden' });
      }
      const db = getDB();
      const orders = await db.all('SELECT * FROM orders ORDER BY createdAt DESC');
      res.json(orders);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed' });
    }
  });
  
  // Get specific order
  router.get('/orders/:id', authenticateToken, async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      const db = getDB();
      const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
      
      if (!order) return res.status(404).json({ error: 'Not found' });
      if (order.userId !== user.id && user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      
      res.json(order);
    } catch(e) {
      console.error(e);
      res.status(500).json({ error: 'Failed' });
    }
  });

  // Update order status (admin)
  router.put('/orders/:id/status', authenticateToken, async (req: Request, res: Response): Promise<any> => {
     try {
       const user = (req as any).user;
       if (user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
       }
       const db = getDB();
       await db.run('UPDATE orders SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
       res.json({ success: true });
     } catch (e) {
       res.status(500).json({ error: 'Failed' });
     }
  });
  
  // Update payment status (user uploads screenshot)
  router.post('/orders/:id/payment', authenticateToken, upload.single('paymentScreenshot'), async (req: Request, res: Response): Promise<any> => {
    try {
       const user = (req as any).user;
       const db = getDB();
       const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
       if (!order || order.userId !== user.id) return res.status(403).json({ error: 'Forbidden' });
       
       const screenshotPath = req.file ? `/uploads/${req.file.filename}` : null;
       await db.run('UPDATE orders SET paymentScreenshotPath = ?, status = ? WHERE id = ?', [screenshotPath, 'Payment Submitted', req.params.id]);
       
       res.json({ success: true, screenshotPath });
    } catch(e) {
       res.status(500).json({ error: 'Failed' });
    }
  });

  // Update order delivery (admin)
  router.post('/orders/:id/deliver', authenticateToken, upload.single('finalZip'), async (req: Request, res: Response): Promise<any> => {
     try {
       const user = (req as any).user;
       if (user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
       }
       const { hostedLink } = req.body;
       const finalZipPath = req.file ? `/uploads/${req.file.filename}` : null;
       
       const db = getDB();
       await db.run('UPDATE orders SET status = ?, hostedLink = ?, finalZipPath = ? WHERE id = ?', 
         ['Completed', hostedLink || null, finalZipPath, req.params.id]
       );
       res.json({ success: true });
     } catch (e) {
       res.status(500).json({ error: 'Failed' });
     }
  });

  // Get messages for an order
  router.get('/orders/:id/messages', authenticateToken, async (req: Request, res: Response): Promise<any> => {
     try {
       const user = (req as any).user;
       const db = getDB();
       const order = await db.get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
       if (!order) return res.status(404).json({ error: 'Not found' });
       if (order.userId !== user.id && user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
       
       const messages = await db.all('SELECT * FROM messages WHERE orderId = ? ORDER BY timestamp ASC', [req.params.id]);
       res.json(messages);
     } catch (e) {
       res.status(500).json({ error: 'Failed' });
     }
  });

  // Post a message in an order thread
  router.post('/orders/:id/messages', authenticateToken, async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as any).user;
      const { text } = req.body;
      const orderId = req.params.id;
      const db = getDB();
      
      const order = await db.get('SELECT * FROM orders WHERE id = ?', [orderId]);
      if (!order) return res.status(404).json({ error: 'Not found' });
      if (order.userId !== user.id && user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
      
      const result = await db.run('INSERT INTO messages (orderId, senderId, senderName, text) VALUES (?, ?, ?, ?)', [orderId, user.id, user.name, text]);
      
      const newMessage = await db.get('SELECT * FROM messages WHERE id = ?', [result.lastID]);
      
      io.to(orderId).emit('new_message', newMessage);
      res.json(newMessage);
    } catch (e) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  return router;
}
