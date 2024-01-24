"use client";

import Link from "next/link";
import { TLabel, navItems } from "./Nav.contant";
import { useState } from "react";

type TCurrentItem = TLabel | false;

export default function NavbarICategory() {
  const [currentItem, setCurrentItem] = useState<TCurrentItem>(false);

  const onClickItem = (item: TCurrentItem) => {
    if (currentItem === item) {
      setCurrentItem(false);
      return;
    }
    setCurrentItem(item);
  };

  return (
    <ul className="flex items-center justify-center h-full gap-4 flex-nowrap">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="relative flex items-center justify-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
          onClick={() => {
            onClickItem(item.label);
          }}
        >
          {item.label}
          {currentItem === item.label && (
            <li
              key={item.label}
              className="absolute flex flex-col w-32 gap-2 px-4 py-2 text-black -translate-x-1/2 translate-y-3 bg-white border rounded-lg cursor-default left-1/2 top-full"
            >
              {item.navList.map((nav) => (
                <a
                  key={nav.label}
                  href={nav.href}
                  className="py-1 border-gray-200 cursor-pointer border-y hover:bg-slate-400 hover:text-white hover:rounded-md"
                >
                  {nav.label}
                </a>
              ))}
            </li>
          )}
        </button>
      ))}
      <Link
        href={"/version"}
        className="relative flex items-center justify-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
      >
        버전
      </Link>
    </ul>
  );
}
