"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri="mongodb+srv://warmudasir095:qK2APzxlFHk6yA0j@relishkashmir.4t7aw.mongodb.net/?retryWrites=true&w=majority&appName=relishKashmir";

export async function dbConnection() {
    let client: MongoClient;
    try{
        client = new MongoClient(uri as string);
        await client.connect();
            const db = client.db('relishKashmir');
            return db;
    }catch(err)
    {
        throw new Error("Failure")
    }
}
