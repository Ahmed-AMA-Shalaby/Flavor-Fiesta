import { Meal } from "@/types/meal.type";
import { Document, Schema, model, models } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

/* MealSchema will correspond to a collection in your MongoDB database. */
const MealSchema = new Schema<Meal>(
  {
    creator: {
      type: String,
      required: [true, "Please provide a creator name for this meal."],
    },
    creatorEmail: {
      type: String,
      required: [true, "Please provide a creator email for this meal."],
    },
    image: {
      type: String,
      required: [true, "Please provide an image url for this meal."],
    },
    instructions: {
      type: String,
      required: [true, "Please provide some instructions for this meal."],
    },
    summary: {
      type: String,
      required: [true, "Please provide a summary for this meal."],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this meal."],
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
    versionKey: false,
    virtuals: true,
  }
);

MealSchema.virtual("id").get(function (doc) {
  return this._id.toHexString();
});

MealSchema.plugin(mongooseLeanVirtuals);

const mealModel = () => model<Meal>("Meal", MealSchema);

export default (models.Meal || mealModel()) as ReturnType<typeof mealModel>;
