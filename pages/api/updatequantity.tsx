// import clientPromise from '../../utils/mongodb';
import { dbConnection } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function orderHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { updateQuantity, productName } = req.body;
    try {
      const db = await dbConnection();
      const itemsCollection = db.collection("items");

      // Update the quantity in the database
      const updateDoc = {
        $set: {
          quantity: updateQuantity,
        },
      };

      const result = await itemsCollection.updateOne(
        { name: productName },
        updateDoc,
      );

      res.status(200).json({ message: "Form submitted successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
