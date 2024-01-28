interface INavItems {
  label: TLabel;
  navList: INavItem[];
}
interface INavItem {
  key: string;
  label: string;
  href: string;
}
export type TLabel = "물류" | "배송" | "인사" | "매장";

export const navItems: INavItems[] = [
  {
    label: "물류",
    navList: [
      { key: "warehousing", label: "입고 조회", href: "/warehousing" },
      { key: "warehousing-management", label: "입고 등록", href: "/warehousing-management" },
      { key: "delivery", label: "출고 조회", href: "/delivery" },
      { key: "delivery-management", label: "출고 등록", href: "/delivery-management" },
      { key: "product", label: "상품 관리", href: "/product-management" },
    ],
  },
  {
    label: "배송",
    navList: [
      { key: "undelivered", label: "배송 예정", href: "/undelivered" },
      { key: "deliveryStatus", label: "배송 관리", href: "/delivery-status" },
    ],
  },
  {
    label: "인사",
    navList: [
      { key: "attendance", label: "출결", href: "/attendance" },
      { key: "salary", label: "급여", href: "/salary" },
    ],
  },
  {
    label: "매장",
    navList: [
      { key: "attendance", label: "매장 현황", href: "/offline-shop" },
      { key: "salary", label: "POS", href: "/offline-shop-POS" },
    ],
  },
];
