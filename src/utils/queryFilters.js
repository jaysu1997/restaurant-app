import { format, isValid, parseISO } from "date-fns";

export function getValidParam(paramValue, validValues, fallback = "") {
  return validValues.includes(paramValue) ? paramValue : fallback;
}

export function parseDateRange(searchParams) {
  const createdTimeParams = searchParams.get("createdAt");

  if (!createdTimeParams) return null;

  const parts = createdTimeParams.split("_");

  if (parts.length !== 2) return null;

  const [fromString, toString] = parts;
  const fromDate = parseISO(fromString);
  const toDate = parseISO(toString);

  if (!isValid(fromDate) || !isValid(toDate)) return null;

  return { from: fromDate, to: toDate };
}

export function parseFilterQuery(searchParams, filtersConfig) {
  return filtersConfig.reduce((filters, filter) => {
    const { queryKey, type, options } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "textInput" || type === "numberInput") {
        value = searchParams.get(queryKey);
      }

      if (type === "select") {
        const validValues = options.map((option) => option.value);
        value = getValidParam(searchParams.get(queryKey), validValues, "");
      }

      if (type === "datePicker") {
        value = parseDateRange(searchParams);
      }
    }

    filters[queryKey] = { type, value };
    return filters;
  }, {});
}

export function hasActiveFilters(filterState) {
  return Object.values(filterState).some((filter) => Boolean(filter.value));
}

export function buildSearchParams(filters, searchParams) {
  const newParams = new URLSearchParams(searchParams);

  for (const [key, filter] of Object.entries(filters)) {
    let value = "";

    if (filter.type === "textInput" && filter.value) {
      value = filter.value.trim();
    }

    if (filter.type === "numberInput" && filter.value) {
      value = filter.value.trim().replace(/^#\s*/, "");
    }

    if (filter.type === "select" && filter.value) {
      value = filter.value;
    }

    if (
      filter.type === "datePicker" &&
      filter.value?.from &&
      filter.value?.to
    ) {
      value = `${format(filter.value.from, "yyyy-MM-dd")}_${format(
        filter.value.to,
        "yyyy-MM-dd",
      )}`;
    }

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  }

  return newParams;
}
