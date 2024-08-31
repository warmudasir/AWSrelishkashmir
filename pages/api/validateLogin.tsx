import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'hello123';
const uri = 'mongodb://localhost:27017';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  let client: MongoClient |null=null;

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      client = new MongoClient(uri);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('users');

      // Find the user by email
      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role, // Access the property directly
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
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
