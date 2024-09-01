import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri=process.env.MONGODB_URI;

export default async function orderHandler(req: NextApiRequest, res: NextApiResponse) {
  let client: MongoClient| null=null;

  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, password, role } = req.body;

    try {
      client = new MongoClient(uri as string);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('users');

      // Check if user already exists
      const existingUser = await collection.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        res.status(404).json({ message: 'User Exists' });
      } else {
        // Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const result = await collection.insertOne({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          role,
        });

        res.status(200).json({ message: 'Form submitted successfully', result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client?.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
