// import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri=process.env.MONGODB_URI;
// const dbName = 'relishKashmir';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
let client: MongoClient;
  if (req.method === 'POST') {
    
    const { review,id,nameofreviewer,userType } = req.body;

    try {
      client = new MongoClient(uri as string);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('productreviews');
      const result = await collection.insertOne({review,id,nameofreviewer,userType});

      res.status(200).json({ message: 'Form submitted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if(req.method==='GET')
  {
    try {
      client = new MongoClient(uri as string);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('productreviews');
      const result = await collection.find({}).toArray();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  } else{
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
