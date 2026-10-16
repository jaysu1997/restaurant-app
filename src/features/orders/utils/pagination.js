export function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [
      ...Array.from({ length: 5 }, (_, index) => index + 1),
      "ellipsis",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      ...Array.from({ length: 5 }, (_, index) => totalPages - 4 + index),
    ];
  }

  return [
    1,
    "ellipsis",
    ...Array.from({ length: 3 }, (_, index) => currentPage - 1 + index),
    "ellipsis",
    totalPages,
  ];
}
