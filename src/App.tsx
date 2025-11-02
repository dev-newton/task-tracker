import { useState } from "react";

import { Category } from "./constants";
import { Header, AddTaskForm, CategoryFilter, TaskList } from "./components";
import { useTasks } from "./hooks/useTasks";

const App = () => {
  const { tasks, addTask, toggleTask, getFilteredTasks } = useTasks();
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  const filteredTasks = getFilteredTasks(categoryFilter);

  return (
    <div className="max-w-2xl mx-auto my-5">
      <Header title="Mini Task Tracker" subTitle="Organize your day!" />
      <AddTaskForm onAddTask={addTask} />
      <div className="mt-20">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-semibold">Task List</h2>
          {tasks.length > 0 && (
            <CategoryFilter
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
          )}
        </div>
        <TaskList
          tasks={filteredTasks}
          onToggleTaskCompleted={toggleTask}
          categoryFilter={categoryFilter}
        />
      </div>
    </div>
  );
};

export default App;
