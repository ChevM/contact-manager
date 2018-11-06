import React, { Component } from "react";
import PropTypes from "prop-types";

export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: true
    };
    this.toggleContactInfoVisibility = this.toggleContactInfoVisibility.bind(
      this
    );
    this.deleteContact = this.deleteContact.bind(this);
  }
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string
    }).isRequired,
    deleteContact: PropTypes.func.isRequired
  };

  toggleContactInfoVisibility() {
    this.setState(prevState => {
      return {
        showContactInfo: !prevState.showContactInfo
      };
    });
  }

  deleteContact() {
    this.props.deleteContact(this.state.id);
  }

  render() {
    const { name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{" "}
          <i
            onClick={this.toggleContactInfoVisibility}
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
          <i
            onClick={this.deleteContact}
            className="fas fa-times float-right"
            style={{ cursor: "pointer", color: "red" }}
          />
        </h4>
        {showContactInfo && (
          <ul className="list-group">
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{phone}</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Contact;
