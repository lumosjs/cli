export function whitelist(data, field, allowedValues, message) {
    const value = data[field];

    if (!Array.isArray(allowedValues)) {
        throw new Error("allowed Values must be an array.");
    }

    if (allowedValues.includes(value)) {
        return null; 
    } else {
        return message || `The field ${field} contains invalid Values.`;
    }
}
