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
      <B>Username</B>
      <input style={inputBorder} size="30" name="username" className="form-control" value={props.state.username} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Password</B>
      <input style={inputBorder} size="30" name="password" className="form-control" value={props.state.password} onChange={props.handleInputChange} />
    </div>
    </div>
)