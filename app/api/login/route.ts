import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function POST(req: NextRequest) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const { email, password } = await req.json();
  // Get user by email (partition key)
  const command = new GetItemCommand({
    TableName: "Users",
    Key: {
      email: { S: email }
    }
  });
  const response = await client.send(command);
  console.log("DynamoDB response:", response.Item); // Log the entire response for debugging
  // User not found
  if (!response.Item) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { status: 404 }
    );
  }
  const user = unmarshall(response.Item);
  // Check password
  if (user.password !== password) {
    return new Response(
      JSON.stringify({ error: "Invalid password" }),
      { status: 401 }
    );
  }

  // Success — don't send password back!
  const { password: _, ...safeUser } = user;
  // Generate JWT token
  const token = jwt.sign(
    {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role, // Access the property directly
    },
    process.env.SECRET_KEY || 'default-secret-key',
    { expiresIn: "1h" },
  );
  cookies().set("token", token);
  return new Response(
    JSON.stringify({ message: "Login successful", user: safeUser, token: token }),
    { status: 200 }
  );
}
