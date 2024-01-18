export const navItems = [
  {
    label: "물류",
    navItem: [
      { key: "warehousing", label: "입고 조회", href: "/warehousing" },
      { key: "delivery", label: "출고 조회", href: "/delivery" },
      { key: "stock", label: "재고 조회", href: "/stock" },
      {
        key: "warehousing-management",
        label: "입고 등록",
        href: "/warehousing-management",
      },
      {
        key: "delivery-management",
        label: "출고 등록",
        href: "/delivery-management",
      },
      { key: "stock", label: "재고 수정", href: "/stock-management" },
      { key: "product", label: "상품 관리", href: "/product-management" },
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
