export type Meal = {
  creator: string;
  creatorEmail: string;
  id?: string;
  image: File | string;
  instructions: string;
  summary: string;
  title: string;
};
