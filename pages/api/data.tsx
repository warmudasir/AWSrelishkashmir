import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// const uri = 'mongodb+srv://warmudasir095:qK2APzxlFHk6yA0j@relishkashmir.4t7aw.mongodb.net/?retryWrites=true&w=majority&appName=relishKashmir';
const dbName = 'relishKashmir';
const uri=process.env.MONGODB_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(uri as string);
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
