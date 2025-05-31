import { dbConnection } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
  const db=await dbConnection();
  if (req.method === 'POST') {
    const { review,id,nameofreviewer,userType } = req.body;
    try {

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
