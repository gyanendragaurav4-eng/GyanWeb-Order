export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Order {
  id: string;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  description: string;
  budget: number;
  domainName: string | null;
  zipFilePath: string | null;
  paymentScreenshotPath: string | null;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Payment Submitted';
  createdAt: string;
  hostedLink: string | null;
  finalZipPath: string | null;
}

export interface Message {
  id: number;
  orderId: string;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: string;
}
