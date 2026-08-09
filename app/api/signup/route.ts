import { NextRequest, NextResponse } from "next/server";
import {
    DynamoDBClient,
    PutItemCommand,
} from "@aws-sdk/client-dynamodb";

export async function POST(req: NextRequest) {
    try {
        const client = new DynamoDBClient({
            region: process.env.AWS_REGION,
        });

        const data = await req.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            role,
        } = data;

        const userId = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const command = new PutItemCommand({
            TableName: "Users",

            Item: {
                email: {
                    S: email,
                },

                firstName: {
                    S: firstName,
                },

                lastName: {
                    S: lastName,
                },

                password: {
                    S: password,
                },

                phone: {
                    S: phone,
                },

                role: {
                    S: role,
                },

                userId: {
                    S: userId,
                },

                createdAt: {
                    S: createdAt,
                },
            },
        });

        await client.send(command);

        return NextResponse.json(
            {
                message: "User registered successfully",
                userId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            {
                error: "Failed to register user",
            },
            { status: 500 }
        );
    }
}