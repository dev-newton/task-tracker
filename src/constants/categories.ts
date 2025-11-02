export const categories = ["work", "personal", "shopping", "study"] as const;

export type Category = (typeof categories)[number];

export type Filter = Category | "all";
