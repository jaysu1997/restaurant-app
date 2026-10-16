export function formatPickupNumber(pickupNumber) {
  return `# ${String(pickupNumber).padStart(4, "0")}`;
}
