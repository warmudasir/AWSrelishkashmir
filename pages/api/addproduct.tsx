import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri=process.env.MONGODB_URI;

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
let client: MongoClient;
  if (req.method === 'POST') {
    
    const { itemName,price,quantity,imageUrl } = req.body;

    try {
      client = new MongoClient(uri as string);
      await client.connect();
      const db = client.db('relishKashmir');

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
