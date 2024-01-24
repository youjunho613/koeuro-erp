"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import NavbarICategory from "./NavbarICategory";

export default function Nav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" color="foreground">
          {/* <KoeuroLogo /> */}
          <p className="font-bold text-inherit">Koeuro</p>
        </Link>
      </NavbarBrand>
      <NavbarICategory />
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
