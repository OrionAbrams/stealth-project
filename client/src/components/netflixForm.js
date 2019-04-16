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
      <B>TV Series Title</B>
      <input style={inputBorder} size="30" name="tvTitle" className="form-control" value={props.state.tvTitle} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>City of Shooting</B>
      <input style={inputBorder} size="30" name="endCity" className="form-control" value={props.state.endCity} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>State of Shooting</B>
      <input style={inputBorder} size="30" name="endState" className="form-control" value={props.state.endState} onChange={props.handleInputChange} />
    </div>
  </div>
)
