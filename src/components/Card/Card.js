import React from "react";

export default function Card() {
  return (
    <div className="card">
      <form className="form-vehicle">
        <input type="radio" id="male" name="gender" value="male" />
        <label for="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label for="female">Female</label>
        <input type="radio" id="other" name="gender" value="other" />
        <label for="other">Other</label>
      </form>
    </div>
  );
}
