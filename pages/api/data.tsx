import { dbConnection } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
   const db=await dbConnection();
    const collection = db.collection('items');
    const posts = await collection.find({}).toArray();

    res.json(posts); // Send JSON response
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Failed to connect to database', details: error.message });
  }
};

export default handler;
