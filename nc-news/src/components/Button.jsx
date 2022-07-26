import React from "react";
import { Link } from "react-router-dom";

export function Button() {
  return (
    <Link to="/users/user_change">
      <button className="btn">Select a User</button>
    </Link>
  );
}
