import type { Category } from "../constants";

export type Task = {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
}