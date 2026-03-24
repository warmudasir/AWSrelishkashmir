import { dbConnection } from "@/lib/db";
import { NextRequest } from "next/server";
const SECRET_KEY = "hello123";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const db = await dbConnection();
  try {
    const collection = db.collection("users");
    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify("Invalid email or password"), {
        status: 401,
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify("Invalid email or password"), {
        status: 401,
      });
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
    cookies().set("token", token);
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
