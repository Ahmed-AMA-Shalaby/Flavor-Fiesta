import { Meal } from "@/types/meal.type";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

type MealsGridProps = {
  meals: Meal[];
};

const MealsGrid: React.FC<MealsGridProps> = ({ meals }) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
