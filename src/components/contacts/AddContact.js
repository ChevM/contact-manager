import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import _ from "lodash";
import TextInputGroup from "../layout/TextInputGroup";

export class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(dispatch, e) {
    e.preventDefault();

    const { name, email, phone } = this.state;

    let errors = {};

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    // Validate input
    if (_.isEmpty(name)) {
      errors.name = "Name field is required";
    }
    if (_.isEmpty(email)) {
      errors.email = "Email field is required";
    }
    if (_.isEmpty(phone)) {
      errors.phone = "Phone field is required";
    }
    this.setState({ errors });

    if (_.isEmpty(errors)) {
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      // Clear state
      this.setState({
        name: "",
        email: "",
        phone: "",
        errors: {}
      });
    }
  }

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(dispatch, e)}>
                  <TextInputGroup
                    label="Name"
                    placeholder="Enter Name..."
                    name="name"
                    value={name}
                    required={false}
                    onChange={this.onChange}
                    error={errors.name}
                    id=""
                  />
                  <TextInputGroup
                    type="email"
                    label="Email"
                    placeholder="Enter Email..."
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                    id=""
                  />
                  <TextInputGroup
                    label="Phone"
                    placeholder="Enter Phone..."
                    name="phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
