import { DynamoDB } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import xss from "xss";
import { v4 as uuidv4 } from "uuid";

const dbClient = new DynamoDB({});
const docClient = DynamoDBDocumentClient.from(dbClient);
const dbTableName = "flavor-fiesta";
const cloudinaryUploadPresetName = "flavor-fiesta";

export async function getMeals() {
  const command = new ScanCommand({
    TableName: dbTableName,
    Select: "ALL_ATTRIBUTES",
  });

  try {
    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    throw error;
  }
}

export async function getMeal(id: string) {
  const command = new QueryCommand({
    TableName: dbTableName,
    KeyConditionExpression: "id = :value",
    ExpressionAttributeValues: { ":value": id },
  });

  try {
    const response = await docClient.send(command);
    return response.Items[0];
  } catch (error) {
    throw error;
  }
}

export async function saveMeal(meal) {
  meal.instructions = xss(meal.instructions);
  meal.image.hash = uuidv4();

  const formData = new FormData();
  formData.append("file", meal.image);
  formData.append("upload_preset", cloudinaryUploadPresetName);
  formData.append("public_id", meal.image.hash);

  await fetch("https://api.cloudinary.com/v1_1/aamas/image/upload", {
    method: "POST",
    body: formData,
  });

  const extension = meal.image.name.split(".").pop();
  meal.image = `${meal.image.hash}.${extension}`;

  const command = new PutCommand({
    TableName: dbTableName,
    Item: {
      id: uuidv4(),
      creator: meal.creator,
      creator_email: meal.creator_email,
      title: meal.title,
      summary: meal.summary,
      instructions: meal.instructions,
      image: meal.image,
    },
  });

  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
}
