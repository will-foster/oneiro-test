export const formatCurrency = (amount: number, currency: string = "gbp") => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(amount);
};
