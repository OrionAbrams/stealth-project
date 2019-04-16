import React from "react";

const B = (props) => <div style={{ fontWeight: 'bold' }}>{props.children}</div>

var inputBorder = {
  border: "none",
  borderBottom: "2px solid gray",
  borderRadius: "0",
  outline: "none"
}

export default (props) => (
  <div>
    <div className="form-group">
      <B>First Name</B>
      <input style={inputBorder} size="30" name="fName" className="form-control" value={props.state.fName} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Last Name</B>
      <input style={inputBorder} size="30" name="lName" className="form-control" value={props.state.lName} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Company Name</B>
      <input style={inputBorder} size="30" name="companyName" className="form-control" value={props.state.companyName} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Email</B>
      <input style={inputBorder} size="30" name="email" className="form-control" value={props.state.email} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Mobile Phone Number</B>
      <input style={inputBorder} type="number" size="30" name="mobilePhone" className="form-control" value={props.state.mobilePhone} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Mailing Address: Street</B>
      <input style={inputBorder} size="30" name="mailingAddress" className="form-control" value={props.state.mailingAddress} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>City</B>
      <input style={inputBorder} size="30" name="nearestCity" className="form-control" value={props.state.nearestCity} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>State</B>
      <input style={inputBorder} size="30" name="state" className="form-control" value={props.state.state} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Actor Names</B>
      <input style={inputBorder} size="30" name="actorNames" className="form-control" value={props.state.actorNames} onChange={props.handleInputChange} />
    </div>
  </div>
)
