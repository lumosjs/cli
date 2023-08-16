export function escape(data, field, message) {
   const value = data[field];
   const maliciousChars = /<|>|&|'|"/;

   if (maliciousChars.test(value)) {
      return message || `The  ${field} contains invalid characters`;
   } else {
      return null;
   }
}
