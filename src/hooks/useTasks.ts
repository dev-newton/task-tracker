import { useState, useEffect, useRef, useCallback } from "react";
import { Task } from "../types/task";
import { Category } from "../constants";

const TASKS_KEY = "mt_tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const rawTasks = localStorage.getItem(TASKS_KEY);
      return rawTasks ? (JSON.parse(rawTasks) as Task[]) : [];
    } catch {
      return [];
    }
  });

  const addTask = useCallback((title: string, category: Category) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), title: trimmed, category, completed: false },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      } catch {}
    }, 150);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [tasks]);

  const getFilteredTasks = useCallback(
    (filter: Category | "all") =>
      filter === "all" ? tasks : tasks.filter((t) => t.category === filter),
    [tasks]
  );

  return { tasks, addTask, toggleTask, getFilteredTasks };
};
