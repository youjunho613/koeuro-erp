"use client";

import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  items: IItem[];
  label: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  placeholder?: string;
}

interface IItem {
  key: string;
  value: string;
  label: string;
}

export default function SortSelect({ items, label, placeholder, color = "default" }: Props) {
  return (
    <Select items={items} label={label} placeholder={placeholder} color={color} className="self-end max-w-xs m-2">
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
}
