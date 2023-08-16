export function required(data, field, message) {
  const value = data[field];
  if (value === undefined || value === null || value === "") {
    return message || `${field} is required.`;
  }
  return null;
}