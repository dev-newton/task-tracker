import { useRef, useState } from "react";
import { categories, Category, LAST_CAT_KEY } from "../constants";

export const AddTaskForm = ({
  onAddTask,
}: {
  onAddTask: (title: string, category: Category) => void;
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category | "">(() => {
    const saved = localStorage.getItem(LAST_CAT_KEY) as Category | null;
    return saved ?? "";
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidTask = title.trim().length > 0 && category !== "";

  const handleCategoryChange = (v: Category | "") => {
    setCategory(v);
    try {
      if (v) localStorage.setItem(LAST_CAT_KEY, v);
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidTask) return;
    onAddTask(title, category as Category);
    setTitle("");

    inputRef.current?.focus();
  };

  return (
    <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <label htmlFor="taskTitle" className="sr-only">Task title</label>
        <input
          id="taskTitle"
          ref={inputRef}
          className="border border-gray-500 h-10 w-full px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="taskCategory" className="sr-only">Category</label>
        <select
          id="taskCategory"
          className="border border-gray-500 h-10 px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={category}
          onChange={(e) =>
            handleCategoryChange(e.target.value as Category | "")
          }
        >
          <option value="" disabled>
            Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category[0].toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-400 font-semibold text-white whitespace-nowrap px-3 h-10 w-full disabled:bg-gray-400"
        disabled={!isValidTask}
      >
        Add task
      </button>
    </form>
  );
};
