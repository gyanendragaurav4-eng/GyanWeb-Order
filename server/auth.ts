import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from './db.js';

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export function setupAuth() {
  const router = Router();
  
  router.post('/register', async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, email, password } = req.body;
      const db = getDB();
      
      const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const isFirstUser = (await db.get('SELECT COUNT(*) as count FROM users')).count === 0;
      const role = isFirstUser ? 'admin' : 'user';
      
      const result = await db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
      );
      
      const token = jwt.sign({ id: result.lastID, email, name, role }, SECRET_KEY, { expiresIn: '24h' });
      res.json({ token, user: { id: result.lastID, email, name, role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/login', async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const db = getDB();
      
      const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/me', authenticateToken, (req: Request, res: Response) => {
    res.json({ user: (req as any).user });
  });

  return router;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // We are importing jwt properly
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    (req as any).user = user;
    next();
  });
}
