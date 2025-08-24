export function flattenTranslations(obj, prefix = "") {
  let result = [];
  for (const key in obj) {
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result.push({ key: newPrefix, text: value });
    } else if (typeof value === "object" && value !== null) {
      result = result.concat(flattenTranslations(value, newPrefix));
    }
  }
  return result;
}