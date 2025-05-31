import { dbConnection } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    
    const { itemName,price,quantity,imageUrl } = req.body;

    try {
     const db=await dbConnection();
      const collection = db.collection('items');
      const result = await collection.insertOne({ itemName,price,quantity,imageUrl});

      res.status(200).json({ message: 'Form submitted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
