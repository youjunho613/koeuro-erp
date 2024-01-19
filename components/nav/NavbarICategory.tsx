"use client";

import {
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from "@nextui-org/react";
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
    <>
      <ul className="flex items-center justify-center h-full gap-1 flex-nowrap">
        {navItems.map((item) => (
          <>
            <button
              onClick={() => {
                onClickItem(item.label);
              }}
            >
              {item.label}
            </button>
            {currentItem === item.label && (
              <li key={item.label} className="flex flex-col">
                {item.label}
                {item.navList.map((nav) => (
                  <a href={nav.href}>{nav.label}</a>
                ))}
              </li>
            )}
          </>
        ))}
      </ul>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem isActive key={item.label}>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="text-lg">
                  {item.label}
                </Button>
              </DropdownTrigger>
              <DropdownMenu items={item.navList}>
                {(nav) => (
                  <DropdownItem key={nav.key}>
                    <Link href={nav.href} color="foreground">
                      {nav.label}
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ))}
      </NavbarContent>
    </>
  );
}
