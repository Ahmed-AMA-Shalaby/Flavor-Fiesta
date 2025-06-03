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
            Buffer.from(
              `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
            ).toString("base64"),
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
