import React, { Component } from "react";

export class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    // PROCESS INPUT //
  }

  render() {
    const { name, email, phone } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name..."
                name="name"
                value={name}
                onChange={this.onChange}
                id=""
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email..."
                name="email"
                value={email}
                onChange={this.onChange}
                id=""
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="Enter Phone..."
                name="phone"
                value={phone}
                onChange={this.onChange}
                id=""
                className="form-control form-control-lg"
              />
            </div>
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddContact;
