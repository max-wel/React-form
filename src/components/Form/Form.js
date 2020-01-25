import React, { Component } from "react";
import * as yup from "yup";
import Input from "../Input/Input";
import formSchema from "../../validations/formSchema";
import {
  sanitizeNumber,
  sanitizeExpirationDate
} from "../../helpers/sanitizeInput";
import {
  formatCardNumber,
  formatExpirationDate
} from "../../helpers/formatInput";
import Button from "../Button/Button";

class Form extends Component {
  state = {
    data: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      cardNumber: "",
      expirationDate: "",
      pin: ""
    },
    errors: {}
  };

  validate = () => {
    try {
      yup
        .object()
        .shape(formSchema)
        .validateSync(this.state.data, { abortEarly: false });
      return null;
    } catch (error) {
      return error;
    }
  };

  validateField = ({ name, value }) => {
    let sanitizedValue = value;
    // Remove slash and hypen from card number and expiration date before validation
    if (name === "cardNumber" || name === "expirationDate") {
      sanitizedValue = value.replace(/[-/]/g, "");
    }
    const data = { [name]: sanitizedValue };
    const fieldSchema = { [name]: formSchema[name] };
    // check if confirm password matches password
    if (name === "confirmPassword") {
      if (value !== this.state.data.password) {
        return "Passwords do not match";
      }
      return;
    }

    try {
      yup
        .object()
        .shape(fieldSchema)
        .validateSync(data);
    } catch (error) {
      const errorMessage = error.errors[0];
      return errorMessage;
    }
  };

  handleChange = ({ target: input }) => {
    const { name, value } = input;
    // validate input field
    const errorMessage = this.validateField(input);
    const errors = { ...this.state.errors };
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }

    if (name === "pin" || name === "cardNumber") {
      const modifiedValue = sanitizeNumber(value);
      if (modifiedValue === "not-number") {
        return;
      }
      const data = { ...this.state.data, [name]: modifiedValue };
      return this.setState({
        data,
        errors
      });
    }

    if (name === "expirationDate") {
      const modifiedValue = sanitizeExpirationDate(value);
      if (modifiedValue === "invalid expiration") {
        return;
      }
      const data = { ...this.state.data, [name]: modifiedValue };
      return this.setState({
        data,
        errors
      });
    }

    if (name === "password") {
      if (value === this.state.data.confirmPassword) {
        delete errors["confirmPassword"];
        this.setState({ errors });
      }
    }

    const data = { ...this.state.data, [name]: value };
    this.setState({
      data,
      errors
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/dashboard");
  };

  render() {
    const { data, errors } = this.state;
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      cardNumber,
      expirationDate,
      pin
    } = data;
    return (
      <div className="container p-3">
        <div className="row justify-content-center mt-5 p-3">
          <div className="col-md-6 border px-3 py-2">
            <form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                label="Full name"
                name="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="text"
                label="Email"
                name="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="text"
                label="Phone number"
                name="phone"
                placeholder="0900000000"
                value={phone}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="******"
                value={password}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="******"
                value={confirmPassword}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="text"
                label="Card number"
                name="cardNumber"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={formatCardNumber(cardNumber)}
                onChange={this.handleChange}
                errors={errors}
                maxLength={19}
              />
              <Input
                type="text"
                label="Expiration date"
                name="expirationDate"
                placeholder="MM/YY"
                value={formatExpirationDate(expirationDate)}
                onChange={this.handleChange}
                errors={errors}
              />
              <Input
                type="text"
                label="PIN"
                name="pin"
                placeholder="****"
                value={pin}
                onChange={this.handleChange}
                errors={errors}
                maxLength={4}
              />
              <Button label="Submit" disabled={this.validate()} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
