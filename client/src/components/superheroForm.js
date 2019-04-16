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
      <B>Movie Title</B>
      <input style={inputBorder} size="30" name="movieTitle" className="form-control" value={props.state.movieTitle} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Planet on which movie is set</B>
      <input style={inputBorder} size="30" name="planet" className="form-control" value={props.state.planet} onChange={props.handleInputChange} />
    </div>
    <div className="form-group">
      <B>Superheroes and their powers</B>
      <input style={inputBorder} size="30" name="powers" className="form-control" value={props.state.powers} onChange={props.handleInputChange} />
    </div>
  </div>
)
