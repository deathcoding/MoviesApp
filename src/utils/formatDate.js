import { format } from "date-fns";

export default function formatDate(date) {
  if (date) {
    return format(new Date(date), "MMMM d, yyyy");
  } else if (date === "") {
    return "No data for this movie";
  }
}
