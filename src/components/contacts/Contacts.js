import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

export class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <div className="col-sm-11 col-md-10 col-lg-9 mx-auto">
              <h1 className="display-4 mb-3">
                <span className="text-primary">Contact</span> List
              </h1>
              <div id="accordion">
                {contacts.map(contact => (
                  <Contact key={contact.id} contact={contact} />
                ))}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
