import { memo } from "react";
import { Task } from "../../types/task";

export const TaskRow = memo(
  ({
    task,
    onToggleTaskCompleted,
  }: {
    task: Task;
    onToggleTaskCompleted: (id: string) => void;
  }) => {
    return (
      <tr className="border-b">
        <td className="py-2 px-4">
          <span className={task.completed ? "line-through text-gray-500" : ""}>
            {task.title}
          </span>
        </td>
        <td className="py-2 px-4 capitalize">{task.category}</td>
        <td className="py-2 px-4">
          <input
            type="checkbox"
            className="accent-green-400"
            checked={task.completed}
            onChange={() => onToggleTaskCompleted(task.id)}
            aria-label={`Mark "${task.title}" as ${
              task.completed ? "incomplete" : "complete"
            }`}
          />
        </td>
      </tr>
    );
  }
);
