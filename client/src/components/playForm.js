import React from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

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
      <B>Title of Play</B>
      <input style={inputBorder} size="30" name="playTitle" className="form-control" value={props.state.playTitle} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Desired Date of Play</B>
      <DatePicker style={inputBorder} size="30" name="desiredInterDate" className="form-control" selected={props.state.desiredInterDate} onChange={props.handleChange} />
    </div>
    <div className="form-group">
      <B>City of Production</B>
      <input style={inputBorder} size="30" name="endCity" className="form-control" value={props.state.endCity} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>State of Production</B>
      <input style={inputBorder} size="30" name="endState" className="form-control" value={props.state.endState} onChange={props.handleInputChange} />
    </div>
  </div>
)
