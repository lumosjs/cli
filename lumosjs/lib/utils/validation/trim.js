export function trim(data, field, message) {
  const value = data[field];
  const pattern = /\s/;

    if (pattern.test(value)) {
      return message || `The  ${field} must not contain spaces..`;
    } else {
        return null;
    }
}




