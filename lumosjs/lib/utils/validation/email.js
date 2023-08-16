export function email(data, field, message) {
  const value = data[field];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (typeof value === "string" && !emailRegex.test(value)) {
    return message || `${field} should be a valid email.`;
  }
  return null;
}