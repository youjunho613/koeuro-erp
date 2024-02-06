export const discountHandler = ({ price, discountRate }: { price: number; discountRate: number }) => {
  return price * (1 - discountRate / 100);
};

export const floorHandler = (price: number) => {
  return Math.floor(price / 1000) * 1000;
};
