import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const uri = 'mongodb://localhost:27017';
const dbName = 'relishKashmir';

// Define the upload directory
const uploadDir = './public/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('items');
  const { name, description, price, quantity } = req.body;
  const imageUrl = `/uploads/${req.file?.filename}`;


  try {
    // Check if a product with the same name already exists
    const existingProduct = await collection.findOne({ name });
    if (existingProduct) {
      res.status(400).json({ error: 'Product with the same name already exists' });
      return;
    }

    const product = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imageUrl,
    };

    await collection.insertOne(product);
    res.status(200).json({ imageUrl });
  } catch (error: any) {
    res.status(500).json({ error: `Failed to insert product: ${error.message}` });
  } finally {
    await client.close();
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so `multer` can handle it
  },
};
