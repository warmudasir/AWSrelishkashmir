import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'relishKashmir';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection('items');
    const posts = await collection.find({}).toArray();

    res.json(posts); // Send JSON response
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Failed to connect to database', details: error.message });
  } finally {
    if (client) {
      console.log('Closing MongoDB connection');
      await client.close();
    }
  }
};

export default handler;
