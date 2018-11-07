import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";

export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false
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
    }).isRequired
  };

  toggleContactInfoVisibility() {
    this.setState(prevState => {
      return {
        showContactInfo: !prevState.showContactInfo
      };
    });
  }

  /**
   * Dispatches an action to delete contact from context
   * @param {number} id
   * @param {function} dispatch
   */
  deleteContact(id, dispatch) {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  }

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    let chevronOrientation = showContactInfo ? "up" : "down";
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.toggleContactInfoVisibility}
                  className={`fas fa-xs fa-chevron-${chevronOrientation}`}
                  style={{ cursor: "pointer" }}
                />
                <i
                  onClick={() => this.deleteContact(id, dispatch)}
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
        }}
      </Consumer>
    );
  }
}

export default Contact;
