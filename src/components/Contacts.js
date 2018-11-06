import React, { Component } from "react";
import Contact from "./Contact";

export class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          id: 1,
          name: "John Doe",
          email: "jdoe@gmail.com",
          phone: "555-555-5555"
        },
        {
          id: 2,
          name: "Karen Williams",
          email: "karen@gmail.com",
          phone: "222-222-2222"
        },
        {
          id: 3,
          name: "Henry Johnson",
          email: "henry@gmail.com",
          phone: "111-111-1111"
        }
      ]
    };
    this.deleteContact = this.deleteContact.bind(this);
  }

  deleteContact(id) {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      };
    });
  }
  render() {
    const { contacts } = this.state;
    return (
      <React.Fragment>
        {contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deleteContact={() => this.deleteContact(contact.id)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Contacts;
