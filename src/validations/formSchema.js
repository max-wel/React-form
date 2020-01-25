import * as Yup from "yup";

const uppercaseRegex = /^(?=.*[A-Z])/;
const numberRegex = /^(?=.*[0-9])/;
const specialCharRegex = /^(?=.*[^\d\w])/;

const schema = {
  fullName: Yup.string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name should contain a minimum of 2 letters")
    .matches(
      /^[a-zA-Z]+\s[a-zA-Z]+$/,
      "Should contain first and last name separated by a space"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a vaild email address"),
  phone: Yup.string().matches(
    /^(070|080|090|081)\d{8}$/,
    "Enter a valid 11 digit phone number"
  ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters")
    .matches(uppercaseRegex, "Password must contain an uppercase letter")
    .matches(numberRegex, "Password must contain a number")
    .matches(specialCharRegex, "Password must contain a special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
  cardNumber: Yup.string().min(16, "Card number must be exactly 16 digits"),
  expirationDate: Yup.string().matches(
    /^(0[1-9]|1[0-2])([0-9]{2})$/,
    "Expiration date should be MM/YY"
  ),
  pin: Yup.string().min(4, "Pin should be a minimum of 4 numbers")
};

export default schema;
