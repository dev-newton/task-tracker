import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  cleanup();
});

test("renders header, add task form, and task list section", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter task title");
  const select = screen.getByRole("combobox");
  const button = screen.getByRole("button", { name: /add task/i });
  const taskList = screen.getByText(/task list/i);

  expect(screen.getByText(/mini task tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/organize your day/i)).toBeInTheDocument();

  expect(input).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(taskList).toBeInTheDocument();
});

test("button is disabled until title and category are set", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter task title");
  const select = screen.getByRole("combobox");
  const button = screen.getByRole("button", { name: /add task/i });

  expect(button).toBeDisabled();
  fireEvent.change(input, { target: { value: "Go for grocery shopping" } });
  expect(button).toBeDisabled();

  fireEvent.change(select, { target: { value: "shopping" } });
  expect(button).toBeEnabled();
});

test("focus returns to input after submitting a task", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter task title");
  const select = screen.getByRole("combobox");
  const button = screen.getByRole("button", { name: /add task/i });

  fireEvent.change(input, { target: { value: "Mow garden" } });
  fireEvent.change(select, { target: { value: "personal" } });
  fireEvent.click(button);

  expect(document.activeElement).toBe(input);
});

test("remembers the last used category after submitting a task", () => {
  const { unmount } = render(<App />);

  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "work" } });
  unmount();

  render(<App />);
  expect(screen.getByRole("combobox")).toHaveValue("work");
});

test("adding a task renders new row", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter task title");
  const select = screen.getByRole("combobox");
  const button = screen.getByRole("button", { name: /add task/i });

  fireEvent.change(input, { target: { value: "Test task 1" } });
  fireEvent.change(select, { target: { value: "shopping" } });
  fireEvent.click(button);

  expect(screen.getByText("Test task 1")).toBeInTheDocument();
});
