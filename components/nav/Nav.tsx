"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Nav() {
  const navItems = [
    {
      label: "물류",
      navItem: [
        { key: "warehousing", label: "입고 관리", href: "/warehousing" },
        { key: "delivery", label: "출고 관리", href: "/delivery" },
        { key: "stock", label: "재고 관리", href: "/stock" },
      ],
    },
    {
      label: "배송",
      navItem: [
        { key: "undelivered", label: "미배송 현황", href: "/undelivered" },
        { key: "deliveryStatus", label: "입고 관리", href: "/delivery-status" },
      ],
    },
    {
      label: "인사",
      navItem: [
        { key: "attendance", label: "출결", href: "/attendance" },
        { key: "salary", label: "급여", href: "/salary" },
      ],
    },
  ];

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" color="foreground">
          {/* <KoeuroLogo /> */}
          <p className="font-bold text-inherit">Koeuro</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem isActive>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="text-lg">
                  {item.label}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={item.navItem}>
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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
