import Database from 'better-sqlite3';

let dbInstance: any;

class DBWrapper {
  private db: any;
  
  constructor(filename: string) {
    this.db = new Database(filename);
  }

  async exec(sql: string) {
    this.db.exec(sql);
  }

  async get(sql: string, params: any[] = []) {
    return this.db.prepare(sql).get(...params);
  }

  async all(sql: string, params: any[] = []) {
    return this.db.prepare(sql).all(...params);
  }

  async run(sql: string, params: any[] = []) {
    const result = this.db.prepare(sql).run(...params);
    return { lastID: result.lastInsertRowid, changes: result.changes };
  }
}

export async function initDB() {
  dbInstance = new DBWrapper('./database.sqlite');

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      userId INTEGER,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      websiteType TEXT,
      description TEXT,
      budget INTEGER,
      domainName TEXT,
      zipFilePath TEXT,
      paymentScreenshotPath TEXT,
      hostedLink TEXT,
      finalZipPath TEXT,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId TEXT,
      senderId INTEGER,
      senderName TEXT,
      text TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Seed admin user
  const adminEmail = 'gyanendragaurav4@gmail.com';
  const admin = await dbInstance.get('SELECT * FROM users WHERE email = ?', [adminEmail]);
  if (!admin) {
     const bcrypt = await import('bcryptjs');
     const hashedPassword = await bcrypt.hash('gyan9162', 10);
     await dbInstance.run(
       'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
       ['Admin', adminEmail, hashedPassword, 'admin']
     );
  }

  return dbInstance;
}

export function getDB() {
  return dbInstance;
}
