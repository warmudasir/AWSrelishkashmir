import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { dbConnection } from '@/lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let client: MongoClient |null=null;

  try {
    const db=await dbConnection();
    const collection = db.collection('orders');
    console.log("called");
    const posts = await collection.find({}).toArray();

    res.json(posts); // Send JSON response
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Failed to connect to database', details: error.message });
  } 
};

export default handler;
