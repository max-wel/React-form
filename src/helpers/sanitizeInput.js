export const sanitizeNumber = value => {
  const newValue = value.replace(/[\s-]/gi, "");
  if (isNaN(newValue)) {
    return "not-number";
  }
  return newValue;
};

export const sanitizeExpirationDate = value => {
  const regex = /^(0[1-9]?|1[0-2]?)([0-9]{2})?$/;
  const newValue = value.replace(/[\s\/]/gi, "");
  if (sanitizeNumber(newValue) === "not-number") {
    return "invalid expiration";
  }
  if (newValue === "") {
    return newValue;
  }
  if (!regex.test(newValue)) {
    return "invalid expiration";
  }
  return newValue;
};
