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
import { navItems } from "./Nav.contant";

export default function NavbarICategory() {
  return (
    <NavbarContent className="hidden gap-4 sm:flex" justify="center">
      {navItems.map((item) => (
        <NavbarItem isActive key={item.label}>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="text-lg">
                {item.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu items={item.navItem}>
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
  );
}
