export const formatCardNumber = value => {
  const formattedNumber = [];
  for (let i = 0; i < value.length; i += 4) {
    formattedNumber.push(value.substring(i, i + 4));
  }
  if (formattedNumber.length) {
    return formattedNumber.join("-");
  }
  return value;
};

export const formatExpirationDate = value => {
  const formattedExpiration = [];
  for (let i = 0; i < value.length; i += 2) {
    formattedExpiration.push(value.substring(i, i + 2));
  }
  if (formattedExpiration.length) {
    return formattedExpiration.join("/");
  }
  return value;
};
