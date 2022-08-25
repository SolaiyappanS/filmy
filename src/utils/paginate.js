import ld from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return ld(items).slice(startIndex).take(pageSize).value();
}
