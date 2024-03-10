import { DynamoDB } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import xss from "xss";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "@/types/meal.type";

const dbClient = new DynamoDB({});
const docClient = DynamoDBDocumentClient.from(dbClient);
const dbTableName = "flavor-fiesta";
const cloudinaryUploadPresetName = "flavor-fiesta";

const getMeals = async () => {
  const command = new ScanCommand({
    TableName: dbTableName,
    Select: "ALL_ATTRIBUTES",
  });

  try {
    const response = await docClient.send(command);
    return response.Items as Meal[];
  } catch (error) {
    throw error;
  }
};

const getMeal = async (id: string) => {
  const command = new QueryCommand({
    TableName: dbTableName,
    KeyConditionExpression: "id = :value",
    ExpressionAttributeValues: { ":value": id },
  });

  try {
    const response = await docClient.send(command);
    return response && response.Items && response.Items[0];
  } catch (error) {
    throw error;
  }
};

const saveMeal = async (meal: Meal) => {
  const mealImageId = uuidv4();

  const formData = new FormData();
  formData.append("file", meal.image);
  formData.append("upload_preset", cloudinaryUploadPresetName);
  formData.append("public_id", mealImageId);

  await fetch("https://api.cloudinary.com/v1_1/aamas/image/upload", {
    method: "POST",
    body: formData,
  });

  const mealImageExtension = (meal.image as File).name.split(".").pop();
  meal.image = `${mealImageId}.${mealImageExtension}`;
  meal.instructions = xss(meal.instructions);

  const command = new PutCommand({
    TableName: dbTableName,
    Item: {
      id: uuidv4(),
      creator: meal.creator,
      creatorEmail: meal.creatorEmail,
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
};
export { getMeals, getMeal, saveMeal };
