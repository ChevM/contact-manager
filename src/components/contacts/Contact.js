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
  async onDeleteClick(id, dispatch, e) {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    // Dispatches in finally block instead of try, because the dummy API does not contain IDs > 12
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  }
  onContactInfoClick(e) {
    e.stopPropagation();
  }

  render() {
    const { id, name, email, phone } = this.props.contact;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div
                className="card-header btn btn-light collapsed"
                onClick={this.toggleContactInfoVisibility}
                id={`heading${id}`}
                style={{ cursor: "pointer" }}
                role="button"
                data-toggle="collapse"
                data-target={`#collapse${id}`}
                aria-expanded="false"
                aria-controls={`collapse${id}`}
              >
                <div className="row justify-content-between">
                  <h5 className="col-auto">
                    <span>
                      {name}
                      <i
                        className={`fas fa-xs fa-fw fa-chevron-custom mx-auto`}
                      />
                    </span>
                  </h5>
                  <i
                    onClick={e => this.onDeleteClick(id, dispatch, e)}
                    className="fas fa-times text-right col-auto"
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </div>
              </div>
              <ul
                id={`collapse${id}`}
                className="list-group collapse"
                data-parent="#accordion"
              >
                <li className="list-group-item card-body">
                  <i class="fas fa-fw fa-envelope" />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li className="list-group-item card-body">
                  <i class="fas fa-fw fa-phone" />
                  <a href={`tel:+${phone}`}>{phone}</a>
                </li>
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
