import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "PPP"); // e.g. Jan 1, 2020
  } catch {
    return dateString;
  }
}
