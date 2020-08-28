import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observations: "",
      passes: [],
      _id:''
    };
    this.addPass = this.addPass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addPass(e) {
    if(this.state._id) {
        fetch(`/api/passes/${this.state._id}`, {
            method: "PUT",
            body: JSON.stringify(this.state),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then((res) => res.json())
          .then(data => {
              console.log(data);
              M.toast({html: 'Pass Updated'});
              this.setState({
                web: "",
                user: "",
                password: "",
                email: "",
                clave: "",
                observations: "",
                _id:""
              });
              this.fetchPasses();
            });
    } else {
        fetch("/api/passes", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              M.toast({ html: "Pass Saved" });
              this.setState({
                web: "",
                user: "",
                password: "",
                email: "",
                clave: "",
                observations: "",
              });
              this.fetchPasses();
            })
            .catch((err) => console.log(err));
    }
    e.preventDefault();
  }

  componentDidMount() {
    this.fetchPasses();
  }

  fetchPasses() {
    fetch("/api/passes")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ passes: data });
        console.log(this.state.passes);
      });
  }

  deletePass(id) {
    if (confirm("Are you sure you want to delete this pass?")) {
      fetch(`/api/passes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({ html: "Pass deleted" });
          this.fetchPasses();
        });
    }
  }

  editPass(id) {
    fetch(`/api/passes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          web: data.web,
          user: data.user,
          password: data.password,
          email: data.email,
          clave: data.clave,
          observations: data.observations,
          _id: data._id
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/*NAVIGATION*/}
        <nav className="light-green darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              My passes
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s3">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addPass}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="web"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="web"
                          value={this.state.web}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="user"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="user"
                          value={this.state.user}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="password"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="password"
                          value={this.state.password}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="email"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="email"
                          value={this.state.email}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="clave"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="clave"
                          value={this.state.clave}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="observations"
                          onChange={this.handleChange}
                          className="materialize-textarea"
                          placeholder="observations"
                          value={this.state.observations}
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s9">
              <table>
                <thead>
                  <tr>
                    <th>Web</th>
                    <th>User</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Claves</th>
                    <th>Observations</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.passes.map((pass) => {
                    return (
                      <tr key={pass._id}>
                        <td>{pass.web}</td>
                        <td>{pass.user}</td>
                        <td>{pass.password}</td>
                        <td>{pass.email}</td>
                        <td>{pass.clave}</td>
                        <td>{pass.observations}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.deletePass(pass._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.editPass(pass._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
