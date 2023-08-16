export function max(data, field, maxLength, message) {
  const value = data[field];
  if (typeof value === "string" && value.length > maxLength) {
    return message || `${field} should have at most ${maxLength} characters.`;
  }
  return null;
}
