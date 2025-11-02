import { Filter } from "../../constants";
import { Task } from "../../types/task";
import { TaskRow } from "./TaskRow";

export const TaskList = ({
  tasks,
  onToggleTaskCompleted,
  categoryFilter,
}: {
  tasks: Task[];
  onToggleTaskCompleted: (id: string) => void;
  categoryFilter: Filter;
}) => {
  if (tasks.length === 0) {
    const msg =
      categoryFilter === "all"
        ? "No tasks yet. Add one to get started."
        : `No ${categoryFilter} tasks found.`;
    return <p className="text-center text-gray-500 mt-10">{msg}</p>;
  }

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  return (
    <>
      <div className="flex items-center gap-6 text-sm text-gray-700 mt-4">
        <p>
          <span className="font-semibold">Total:</span> {total}
        </p>
        <p>
          <span className="font-semibold">Completed:</span> {completed}
        </p>
        <p>
          <span className="font-semibold">Remaining:</span> {remaining}
        </p>
      </div>
      <div className="min-h-[200px] max-h-[400px] overflow-y-auto border mt-2">
        <table className="w-full border-collapse text-left">
          <thead className="border-b">
            <tr>
              <th scope="col" className="py-2 px-4">Task</th>
              <th scope="col" className="py-2 px-4">Category</th>
              <th scope="col" className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <TaskRow
                  key={task.id}
                  task={task}
                  onToggleTaskCompleted={onToggleTaskCompleted}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
