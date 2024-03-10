"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text: string) => {
  return !text || text.trim() === "";
};

const shareMeal = async (
  prevState: { message: string | null },
  formData: FormData
): Promise<{ message: string | null }> => {
  const meal = {
    title: formData.get("title")!.toString(),
    summary: formData.get("summary")!.toString(),
    instructions: formData.get("instructions")!.toString(),
    image: formData.get("image") as File,
    creator: formData.get("name")!.toString(),
    creatorEmail: formData.get("email")!.toString(),
  };

  if (
    isInvalidText(meal.title!) ||
    isInvalidText(meal.summary!) ||
    isInvalidText(meal.instructions!) ||
    isInvalidText(meal.creator!) ||
    isInvalidText(meal.creatorEmail!) ||
    !meal.creatorEmail!.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};

export { shareMeal };
