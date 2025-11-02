import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../hooks/useTasks";

describe("useTasks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a new task to the list", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks.length).toBe(0);

    act(() => {
      result.current.addTask("Test task 1", "work");
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("Test task 1");
    expect(result.current.tasks[0].category).toBe("work");
    expect(result.current.tasks[0].completed).toBe(false);
  });

    it("toggles task completion", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Toggle test", "shopping");
    });

    const id = result.current.tasks[0].id;

    act(() => {
      result.current.toggleTask(id);
    });

    expect(result.current.tasks[0].completed).toBe(true);

    act(() => {
      result.current.toggleTask(id);
    });

    expect(result.current.tasks[0].completed).toBe(false);
  });

    it("filters tasks by category", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("Go to the office", "work");
      result.current.addTask("Buy groceries", "shopping");
    });

    const filtered = result.current.getFilteredTasks("shopping");

    expect(filtered.length).toBe(1);
    expect(filtered[0].category).toBe("shopping");
  });

});
