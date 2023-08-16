export function min(data, field, minLength, message) {
  const value = data[field];
  if (typeof value === "string" && value.length < minLength) {
    return message || `${field} should have at least ${minLength} characters.`;
  }
  return null;
}