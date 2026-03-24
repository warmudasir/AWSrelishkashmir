"use server";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/lib/db";

const SECRET_KEY = "hello123";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookieStore = await cookies();
  if (req.method === "POST") {
    const { email, password } = req.body;
    const db = await dbConnection();

    try {
      const collection = db.collection("users");

      // Find the user by email
      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
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
        { expiresIn: "1h" },
      );
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
