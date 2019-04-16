import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios"
import defaultForm from "../components/defaultForm"
import playForm from "../components/playForm"
import netflixForm from "../components/netflixForm"
import superheroForm from "../components/superheroForm"
import loginForm from "../components/loginForm"
import admin from "../components/admin"
import moment from 'moment'
import Background from '../images/generic_bottom.jpg'
import Logo from "../images/just_logo.png"
import "./style.css"

// to add bold style in JSX
const B = (props) => <div style={{ fontWeight: 'bold' }}>{props.children}</div>

// background image
var sectionStyle = {
  minWidth: "100%",
  minHeight: "100vh",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  fontFamily: "'Montserrat', 'sans-serif'"
};

// style for forms
var formStyle = {
  marginTop: "40px",
  paddingBottom: "20px"
}

// style for block/buttons
var blockStyle = {
  display: 'inline-block'
}
var buttonMargins = {
  margin: '20px'
}

// background for forms
var whiteBack = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "20px"
}

// variable for the date that is picked by user choosing something on Datepicker--play form
let date

// test to see if valid email, don't let form submit if not
function ValidateEmail(email) {
  if (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  alert("Please enter a valid email address!")
  return (false)
}

// var neededPass (only used to make admin account) --kept comment in for making new app
var neededPass

class Home extends React.Component {

  state = {
    //possibly need title dropdown (Mr. Mrs. Jr, etc) Mr, Mrs, Miss, Ms, Mx, Sir, Dr, Lady or Lord
    fName: "",
    lName: "",
    companyName: "",
    email: "",
    mobilePhone: "",
    mailingAddress: "",
    actorNames: "",
    nearestCity: "",
    state: "",
    playTitle: "",
    tvTitle: "",
    movieTitle: "",
    desiredInterDate: "",
    endCity: "",
    endState: "",
    planet: "",
    powers: "",
    formChoiceSubmitted: false,
    redirect: false,
    play: false,
    netflix: false,
    superhero: false,
    loggedIn: false,
    adminView: false,
    newUsername: "",
    newPassword: "",
    username: "",
    password: "",
    userList: ""
  };

  // use below code and add button in jsx if want to make an admin

  makeUser = () => {
    axios.get("/api/adminpass")
    .then((res) => {
      neededPass = res.data
    }).then(() => {
    var newUser = {
      username: "admin",
      password: neededPass
    }
    axios.post("/api/users", newUser)
      .then((res) => {
      })
    })
  }

  // make new user function (as admin)
  newUser = event => {
    event.preventDefault()
    console.log(this.state.newUsername, this.state.newPassword)
    var newUser = {
      username: this.state.newUsername.trim(),
      password: this.state.newPassword.trim()
    }
    axios.post("/api/users", newUser)
      .then((res) => {
        alert("You made a user with the username: " + newUser.username + " and the password: " + newUser.password)
      })
  }

  // show play users as admin
  showPlay = event => {
    event.preventDefault()
    axios.get("/api/playusers")
      .then((res) => {
        this.setState({ userList: JSON.stringify(res.data) })
      })
  }

  // show netflix users as admin
  showNetflix = event => {
    event.preventDefault()
    axios.get("/api/netflixusers")
      .then((res) => {
        this.setState({ userList: JSON.stringify(res.data) })
      })
  }

  // show superhero users as admin
  showSuperhero = event => {
    event.preventDefault()
    axios.get("/api/superherousers")
      .then((res) => {
        this.setState({ userList: JSON.stringify(res.data) })
      })
  }

  // function to log in, if invalid credentials cannont because of passport
  logIn = event => {
    event.preventDefault()
    var authenticationData = {
      username: this.state.username,
      password: this.state.password
    }
    if (!this.state.username) {
      alert("You cannot leave the username field blank!")
      return
    }
    if (!this.state.password) {
      alert("You cannot leave the password field blank!")
      return
    }
    console.log(authenticationData)
    axios.post("/api/login", authenticationData)
      .then((res) => {
        if (res.config.data.split(',')[0] === '{"username":"admin"') {
          this.setState({
            adminView: true
          });
        }
        else {
          this.setState({
            loggedIn: true,
            adminView: false
          });
        }
      }).catch(err => alert("Invalid credentials!"));
  }

  // shows play form when clicked
  playClick = () => {
    this.setState({ formChoiceSubmitted: true, play: true })
  }

  // shows netflix form when clicked
  netflixClick = () => {
    this.setState({ formChoiceSubmitted: true, netflix: true })
  }

  // shows telcoms form when clicked
  superheroClick = () => {
    this.setState({ formChoiceSubmitted: true, superhero: true })
  }

  // standard handle change for forms in react
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // separate handle change for date in Datepicker npm
  handleChange = dateEntered => {
    date = dateEntered
    this.setState({
      desiredInterDate: date
    })
  }

  // check many things about form to see if correct before submitting
  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.fName) {
      alert("You cannot leave the First Name field blank!")
      return
    }
    else if (!this.state.lName) {
      alert("You cannot leave the Last Name field blank!")
      return
    }
    else if (!this.state.companyName) {
      alert("You cannot leave the Company Name field blank!")
      return
    }
    else if (!ValidateEmail(this.state.email)) {
      return
    }
   
    if (this.state.play && !this.state.desiredInterDate) {
      alert("You cannot leave the Desired Date blank!")
      return
    }

    var userData = {
      fName: this.state.fName.trim(),
      lName: this.state.lName.trim(),
      email: this.state.email.trim(),
      mobilePhone: this.state.mobilePhone.trim(),
      mailingAddress: this.state.mailingAddress.trim(),
      actorNames: this.state.actorNames.trim(),
      playTitle: this.state.playTitle.trim(),
      tvTitle: this.state.tvTitle.trim(),
      movieTitle: this.state.movieTitle.trim(),
      nearestCity: this.state.nearestCity.trim(),
      state: this.state.state.trim(),
      planet: this.state.planet.trim(),
      powers: this.state.powers.trim(),
      desiredInterDate: moment(date).format("MM/DD/YYYY"),
      endCity: this.state.endCity.trim(),
      endState: this.state.endState.trim(),
      currentDate: moment(Date.now()).format("MM/DD/YYYY")
    }

    // I was emptying specific fields here so same session wouldn't try to send Hellosign info from other forms
    console.log(userData)
    if (this.state.play) {
      axios.post("/api/playusers", userData)
        .then((res) => {
          alert("Information submitted successfully!")
          console.log(res.data)
          this.setState({
            formChoiceSubmitted: false,
            play: false,
            desiredInterDate: "",
            playTitle: ""
          });
        })
    }
    if (this.state.netflix) {
      axios.post("/api/netflixusers", userData)
        .then((res) => {
          alert("Information submitted successfully!")
          console.log(res.data)
          this.setState({
            formChoiceSubmitted: false,
            netflix: false,
            tvTitle: "",
          });
        })
    }
    if (this.state.superhero) {
      axios.post("/api/superherousers", userData)
        .then((res) => {
          alert("Information submitted successfully!")
          console.log(res.data)
          this.setState({
            formChoiceSubmitted: false,
            superhero: false,
            movieTitle: ""
          });
        })
    }
  };

  render() {
    return (
      <div style={sectionStyle}>
      {/* use button below if need to make an admin (admin can make other users) */}
      <button onClick={this.makeUser}>Make Admin</button>
        <MDBCol md="12" className="backBar">
          <img src={Logo} className="logo" alt={"generic company top logo"} />
        </MDBCol>
        <MDBContainer>

          {this.state.adminView ?
            <div>
              <MDBRow style={formStyle}>

                <MDBCol md="3"></MDBCol>
                <MDBCol md="6" style={whiteBack}>

                  <p className="h5 text-center">Make New User (5 day expiry)</p>
                  <form className="form">
                    {admin(this)}
                    <button className="btn btn-lg btn-generic-company" style={blockStyle} onClick={this.newUser}>make new user</button>
                  </form>
                </MDBCol>
              </MDBRow>
              <MDBRow style={formStyle}>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6" style={whiteBack}>
                  <form className="form">
                    <MDBRow>
                      <MDBCol md="4">
                        <button style={blockStyle} className="btn btn-sm btn-generic-company" onClick={this.showPlay}>Play users</button>
                      </MDBCol>
                      <MDBCol md="4">
                        <button style={blockStyle} className="btn btn-sm btn-generic-company" onClick={this.showNetflix}>Netflix users</button>
                      </MDBCol>
                      <MDBCol md="4">
                        <button style={blockStyle} className="btn btn-sm btn-generic-company" onClick={this.showSuperhero}>Movie users</button>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </MDBCol>
              </MDBRow>
              <MDBRow style={formStyle}>
                <MDBCol md="3"></MDBCol>
                <MDBCol md="6" style={whiteBack}>
                  {this.state.userList ?
                    <div>
                      <B>User List</B>
                      <MDBCol md="6">{this.state.userList}</MDBCol>
                    </div> : null}
                </MDBCol>
              </MDBRow>
            </div>
            : null}

          {!this.state.loggedIn ?
            <MDBRow style={formStyle}>
              <MDBCol md="3"></MDBCol>
              <MDBCol md="6" style={whiteBack} >
                <p className="h5 text-center">Login for Generic Entertainment Company Agreement Forms</p>
                <form className="form">
                  <div>{loginForm(this)}</div><button className="btn btn-lg btn-generic-company float-right" onClick={this.logIn}>submit</button>
                </form>
              </MDBCol>
            </MDBRow>
            : (
              <div>
                {this.state.formChoiceSubmitted ? (
                  <div>
                    <MDBRow style={formStyle}>
                      <MDBCol md="3"></MDBCol>
                      <MDBCol md="6" style={whiteBack}>
                        Please fill out your information below to be sent a contract for the energy grid to sign. You can view the contract without your filled in information <a href="#">here.</a> (link unavailable at this time)
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={formStyle}>
                      <MDBCol md="3"></MDBCol>
                      <MDBCol md="6" style={whiteBack}>
                        <p className="h5 text-center"><B>Your Information</B></p>

                        <form className="form">
                          <div> {defaultForm(this)} </div>
                          {this.state.play ? <div> {playForm(this)} </div> : null}
                          {this.state.netflix ? <div> {netflixForm(this)} </div> : null}
                          {this.state.superhero ? <div> {superheroForm(this)} </div> : null}
                          <button onClick={this.handleFormSubmit} type="submit" className="btn btn-lg btn-generic-company float-right">
                            Submit
                </button>
                        </form>
                      </MDBCol>
                    </MDBRow>
                  </div>
                ) : (
                    <div>

                      <MDBRow style={formStyle}>
                        <MDBCol md="3"></MDBCol>
                        <MDBCol md="6" style={whiteBack}>
                          <p className="h5 text-center">Choose Agreement Form</p>
                          <p className="h5 text-center">(if multiple, must fill out each individually)</p>
                          <MDBRow>
                            <div>
                              <button className="btn btn-generic-company" style={buttonMargins} onClick={this.playClick}>Play</button>
                              <button className="btn btn-generic-company" style={buttonMargins} onClick={this.netflixClick}>Netflix</button>
                              <button className="btn btn-generic-company" style={buttonMargins} onClick={this.superheroClick}>Superhero</button>
                            </div>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow style={formStyle}>
                        <MDBCol md="3"></MDBCol>
                        <MDBCol md="6" style={whiteBack}>
                          <B>Terms and Conditions:</B> This production agreement is in no way binding, as this is just a clone of another project I have done with sensitive information that I cannot make public.
                    </MDBCol>
                      </MDBRow>
                    </div>
                  )}
              </div>

            )}
        </MDBContainer>
      </div>
    );
  }
}
export default Home;
