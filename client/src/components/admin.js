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
      <B>New Username</B>
      <input style={inputBorder} size="30" name="newUsername" className="form-control" value={props.state.newUsername} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>New Password</B>
      <input style={inputBorder} size="30" name="newPassword" className="form-control" value={props.state.newPassword} onChange={props.handleInputChange} />
    </div>
  </div>
)
