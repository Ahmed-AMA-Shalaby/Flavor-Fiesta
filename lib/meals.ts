import xss from "xss";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "@/types/meal.type";
import MealModel from "@/models/Meal";
import dbConnect from "./dbConnect";

const getMeals = async () => {
  try {
    await dbConnect();
    const meals = (await MealModel.find({}).lean({ virtuals: true })) as Meal[];
    return meals;
  } catch (error) {
    console.error(error);
  }
};

const getMeal = async (id: string) => {
  try {
    await dbConnect();
    const meal = (await MealModel.findById(id).lean({
      virtuals: true,
    })) as Meal;
    return meal;
  } catch (error) {
    console.error(error);
  }
};

const uploadImage = async (image: File, imageId: string) => {
  const uploadImageFormData = new FormData();
  uploadImageFormData.append("file", image);
  uploadImageFormData.append("upload_preset", "flavor-fiesta");
  uploadImageFormData.append("public_id", imageId);

  await fetch("https://api.cloudinary.com/v1_1/aamas/image/upload", {
    method: "POST",
    body: uploadImageFormData,
  });
};

const saveMeal = async (meal: Meal) => {
  try {
    meal.instructions = xss(meal.instructions);
    const newMeal = new MealModel({
      creator: meal.creator,
      creatorEmail: meal.creatorEmail,
      image: "",
      instructions: meal.instructions,
      summary: meal.summary,
      title: meal.title,
    });

    const mealImageExtension = (meal.image as File).name.split(".").pop();
    const mealImageId = `flavor-fiesta/new/${newMeal.id}`;
    await uploadImage(meal.image as File, mealImageId);

    newMeal.image = `${mealImageId}.${mealImageExtension}`;
    await dbConnect();
    await newMeal.save();
  } catch (error) {
    console.error(error);
  }
};

export { getMeals, getMeal, saveMeal };
