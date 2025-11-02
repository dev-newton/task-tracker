import { categories, Filter } from "../constants";

export const CategoryFilter = ({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) => {
  return (
    <select
      className="border border-gray-500 h-10 px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
      value={value}
      onChange={(e) => onChange(e.target.value as Filter)}
    >
      <option value="all">All</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category[0].toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
};
