export function integer(data, field, message) {
  const value = data[field];
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return message || `${field} should be an integer.`;
  }
  return null;
}