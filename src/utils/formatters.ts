const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(dateString: string): string {
  return dateFormatter.format(new Date(dateString));
}

export function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  return `Due ${formatDate(deadline)}`;
}
