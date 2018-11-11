import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false
    };
    this.toggleContactInfoVisibility = this.toggleContactInfoVisibility.bind(
      this
    );
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onContactInfoClick = this.onContactInfoClick.bind(this);
  }
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
   * Makes delete request to API and then dispatches an action to delete contact from context
   * @param {number} id
   * @param {function} dispatch
   */
  onDeleteClick(id, dispatch, e) {
    e.stopPropagation();
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_CONTACT", payload: id });
      });
  }
  onContactInfoClick(e) {
    e.stopPropagation();
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
            <div
              className="card card-body mb-3"
              onClick={this.toggleContactInfoVisibility}
              style={{ cursor: "pointer" }}
            >
              <h5 className="row justify-content-between">
                <span className="col-auto">
                  {name}
                  <i
                    className={`fas fa-xs fa-fw fa-chevron-${chevronOrientation} pl-2 mr-auto`}
                  />
                </span>
                <i
                  onClick={e => this.onDeleteClick(id, dispatch, e)}
                  className="fas fa-times text-right col-auto"
                  style={{ cursor: "pointer", color: "red" }}
                />
              </h5>
              {showContactInfo && (
                <ul
                  className="list-group"
                  onClick={this.onContactInfoClick}
                  style={{ cursor: "initial" }}
                >
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
