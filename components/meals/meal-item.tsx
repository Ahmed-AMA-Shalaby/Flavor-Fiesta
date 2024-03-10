import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { Meal } from "@/types/meal.type";

const MealItem: React.FC<Meal> = ({ id, title, image, summary, creator }) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://res.cloudinary.com/aamas/image/upload/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
