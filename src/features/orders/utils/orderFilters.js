import { addDays } from "date-fns";
import { parseDateRange } from "../../../utils/queryFilters.js";

export function getCreatedAtRange(searchParams) {
  const dateRange = parseDateRange(searchParams);

  if (!dateRange) return null;

  return {
    from: dateRange.from.toISOString(),
    to: addDays(dateRange.to, 1).toISOString(),
  };
}
