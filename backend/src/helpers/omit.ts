function omit<T extends Record<string, any>>(
    obj: T,
    property: keyof T | (keyof T)[]
  ) {
    if (Array.isArray(property)) {
      const entries = Object.entries(obj).filter(([key]) => {
        return !property.includes(key);
      });
  
      return Object.fromEntries(entries) as Omit<T, keyof T>;
    }
  
    const { [property]: unused, ...rest } = obj;
  
    return rest as Omit<T, typeof property>;
  }
  
  export default omit;
  