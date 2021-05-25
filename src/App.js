import React, { Component, useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Background from "./background.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [goalInput, setGoalInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState();
  const [email, setEmail] = useState("");
  const [superVisorEmail, setSuperVisorEmail] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [remainingTimeState, setRemainingTimeState] = useState(0);

  let sectionStyle = {
    display: "flex",
    width: width,
    height: 1024,
    background: `url(${Background})`,
  };

  let priceValueOfArray = ["25₺", "50₺", "100₺", "250₺", "1000₺"];

  const remainingTimeIsFunc = (inputTime) => {
    let convertNewDate = new Date().getTime();
    let convertInputTime = inputTime.getTime();
    let remainingTimeResult = convertInputTime - convertNewDate;
    let lastTimeInNow = Math.round(remainingTimeResult / (1000 * 3600 * 24));
    return lastTimeInNow;
  };

  let displayIsState;

  if (goalInput === "") {
    displayIsState = "none";
  } else if (email === "") {
    displayIsState = "none";
  } else if (superVisorEmail === "") {
    displayIsState = "none";
  } else if (remainingTimeState === 0) {
    displayIsState = "none";
  } else if (dropdownValue === undefined) {
    displayIsState = "none";
  } else {
    displayIsState = "auto";
  }

  return (
    <div style={sectionStyle}>
      <div style={{
        marginLeft: width/3,
      }} className="d-flex align-items-center">
        <form
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            width: "500px",
            height: "600px",
            paddingLeft: "70px",
            paddingTop: "30px",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                color: "white",
                marginBottom: "10px",
              }}
            >
              Please enter your goal
            </div>
            <input
              style={{
                borderRadius: 5,
                width: "300px",
              }}
              value={goalInput}
              onChange={(e) => {
                setGoalInput(e.target.value);
              }}
              type="text"
              placeholder="Enter Goal"
            />
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ marginRight: "20px", marginBottom: "30px" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginBottom: "10px",
                  }}
                >
                  Today
                </div>
                <DatePicker selected={startDate} minDate={new Date()} />
              </div>
              <div style={{ marginRight: "20px" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginBottom: "10px",
                  }}
                >
                  Selected Date
                </div>
                <DatePicker
                  selected={finishDate}
                  minDate={new Date()}
                  onChange={(date) => {
                    setFinishDate(date);
                    setRemainingTimeState(remainingTimeIsFunc(date));
                  }}
                />
              </div>
            </div>
            <div
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: "30px",
              }}
            >
              {`That's ${remainingTimeState} days from now`}
            </div>
            <div
              style={{
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 20,
                  marginBottom: "10px",
                }}
              >
                Setting price
              </div>
              <select
                onChange={(e) => {
                  e.preventDefault();
                  setDropdownValue(e.target.value);
                }}
                value={dropdownValue}
                style={{
                  borderRadius: 5,
                }}
              >
                {priceValueOfArray.map((val, ind) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>
            </div>
            <div
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: "30px",
              }}
            >
              You pay if you fail.
            </div>
            <div
              style={{
                marginBottom: "30px",
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: 5,
                  marginRight: "20px",
                }}
                placeholder="Email"
              />
              <input
                value={superVisorEmail}
                onChange={(e) => setSuperVisorEmail(e.target.value)}
                style={{
                  borderRadius: 5,
                  marginRight: "20px",
                }}
                placeholder="Supervisor Email"
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  pointerEvents: displayIsState,
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Agreement
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Agreement
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div>{`Goal: ${goalInput}`}</div>
                      <div>{`Remaining time: ${remainingTimeState} days`}</div>
                      <div>{`Setting price: ${dropdownValue}`}</div>
                      <div>{`Email: ${email}`}</div>
                      <div>{`Supervisor Email: ${superVisorEmail}`}</div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          alert("You fail");
                          window.location.reload();
                        }}
                      >
                        Not agree
                      </button>
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          alert(
                            "DONE! I saved your goal. Time to get cracking"
                          );
                          window.location.reload();
                        }}
                        class="btn btn-primary"
                      >
                        Agree
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
