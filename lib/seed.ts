import MealModel from "@/models/Meal";
import dbConnect from "./dbConnect";

const seed = async () => {
  try {
    await fetch(
      "https://api.cloudinary.com/v1_1/aamas/resources/image/upload?prefix=flavor-fiesta/new/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
            ),
        },
      }
    );

    await dbConnect();
    await MealModel.deleteMany({
      image: { $regex: "^flavor-fiesta/new/", $options: "i" },
    });

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

export default seed;
