import { Product } from "@/app/types/common";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
export async function getProducts() {
    const client = new DynamoDBClient({ region: "ap-south-1" });
    const command = new ScanCommand({ TableName: "Products" });
    const response = await client.send(command);
    const items = response.Items?.map(item => unmarshall(item)) || [];
    return items as Product[];

}