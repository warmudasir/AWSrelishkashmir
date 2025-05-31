import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { sendOrderConfirmationEmail } from '../../utility/email';
const uri=process.env.MONGODB_URI;

export default async function orderHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: MongoClient |null=null;

  try {
    client = new MongoClient(uri as string);
    await client.connect();
    const db = client.db("relishKashmir");

    if (req.method === "POST") {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        pincode,
        itemNumber,
        quantity,
        productname,
        productprice,
        imageUrl,
        orderStatus,
        orderId
      } = req.body;

      const collection = db.collection("orders");
      const itemsCollection = db.collection("items");

      const item = await itemsCollection.findOne({ name: productname });

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      const newQuantity = item.quantity - quantity;

      if (newQuantity < 0) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const updateDoc = {
        $set: {
          quantity: newQuantity,
        },
      };

      await itemsCollection.updateOne({ name: productname }, updateDoc);
      const result = await collection.insertOne({
        firstName,
        lastName,
        email,
        phone,
        address,
        pincode,
        itemNumber,
        quantity,
        productname,
        productprice,
        imageUrl,
        orderStatus,
        orderId
      });
      await sendOrderConfirmationEmail(email, {
        productname,
        quantity,
        orderStatus
        // orderId,
        // paymentId,
      });


      res.status(200).json({ message: "Form submitted successfully", result });
    } else if (req.method === "PATCH") {
      const { orderId } = req.query;
      const { orderStatus } = req.body;

      // Log the orderId to verify its format
      console.log("Order ID:", orderId);

      if (!orderId || typeof orderId !== "string") {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const collection = db.collection("orders");
      const result = await collection.updateOne(
        { orderId: orderId }, // Match by orderId field
        { $set: { orderStatus } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order status updated successfully" });
    } else {
      res.setHeader("Allow", ["POST", "PATCH"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
