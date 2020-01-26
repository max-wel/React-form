const sanitizeNumber = value => {
  const newValue = value.replace(/[\s-]/gi, "");
  if (isNaN(newValue)) {
    return "not-number";
  }
  return newValue;
};

const sanitizeExpirationDate = value => {
  const regex = /^(0[1-9]?|1[0-2]?)([0-9]{2})?$/;
  const newValue = value.replace(/[\s\/]/gi, "");
  if (sanitizeNumber(newValue) === "not-number") {
    return "invalid expiration";
  }
  if (newValue === "") {
    return newValue;
  }
  if (Number(newValue[0]) > 1) {
    return `0${newValue}`;
  }
  if (!regex.test(newValue)) {
    return "invalid expiration";
  }
  return newValue;
};

const sanitizeFullName = value => {
  const regex = /^[a-zA-Z]*\s?[a-zA-Z]*$/;
  if (!regex.test(value)) {
    return "invalid full name";
  }
  return value;
};

export const sanitizeField = (name, value) => {
  switch (name) {
    case "fullName": {
      const sanitizedValue = sanitizeFullName(value);
      if (sanitizedValue === "invalid full name") {
        return "invalid input";
      }
      return sanitizedValue;
    }
    case "expirationDate": {
      const sanitizedValue = sanitizeExpirationDate(value);
      if (sanitizedValue === "invalid expiration") {
        return "invalid input";
      }
      return sanitizedValue;
    }
    case "cardNumber": {
      const sanitizedValue = sanitizeNumber(value);
      if (sanitizedValue === "not-number") {
        return "invalid input";
      }
      return sanitizedValue;
    }
    case "pin": {
      const sanitizedValue = sanitizeNumber(value);
      if (sanitizedValue === "not-number") {
        return "invalid input";
      }
      return sanitizedValue;
    }

    default:
      return value;
  }
};
