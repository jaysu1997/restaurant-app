import { formatPickupStr } from "../../../utils/dateTime.js";

export function toSelectOption(value, label = value) {
  return value != null ? { label, value } : null;
}

export function toPickupTimeOption(pickupTime) {
  if (!pickupTime) return null;

  const date = new Date(pickupTime);

  return {
    label: formatPickupStr(date),
    value: date.toISOString(),
  };
}

export function createDraftItems(items) {
  return items.map((item) => ({
    ...item,
    unitUsage: Object.fromEntries(
      item.unitUsage.map(({ uuid, name, quantity }) => [
        uuid,
        { name, quantity },
      ]),
    ),
  }));
}
