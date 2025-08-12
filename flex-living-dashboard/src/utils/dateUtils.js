import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "PPP");
  } catch {
    return dateString;
  }
}
