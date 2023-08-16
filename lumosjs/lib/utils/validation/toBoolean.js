export function toBoolean(data, field, message) {
  const value = data[field];
  
  if (typeof value === "string" || typeof value != "boolean") {
    return message || `${field} should be an boolean.`;
  }
  return null;
}