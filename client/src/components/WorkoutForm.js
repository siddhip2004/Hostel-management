import { useState, history } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [Name1, setName1] = useState("");
  const [Name2, setName2] = useState("");
  const [Name3, setName3] = useState("");
  const [RoomNo, setRoomNo] = useState(" ");
  const [error, setError] = useState(" ");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (event) => {
    console.log("Label 👉️", event.target.selectedOptions[0].label);
    console.log(event.target.value);
    setRoomNo(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const details = { Name1, Name2, Name3, RoomNo };

    // const response = await fetch("/api/workouts/homes", {
      const response = await fetch("http://localhost:4000/api/workouts/home", {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log("Rohan");
      history.push("/chat");
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName1("");
      setName2("");
      setName3("");
      setRoomNo("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  console.log(Name1);
  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add RoomMates</h3>

        <label>Room Mate-1:</label>
        <input
          type="text"
          onChange={(e) => setName1(e.target.value)}
          value={Name1}
          className={emptyFields.includes("Name1") ? "error" : ""}
        />

        <label>Room Mate-2:</label>
        <input
          type="text"
          onChange={(e) => setName2(e.target.value)}
          value={Name2}
          className={emptyFields.includes("Name2") ? "error" : ""}
        />

        <label>Room Mate-3:</label>
        <input
          type="text"
          onChange={(e) => setName3(e.target.value)}
          value={Name3}
          className={emptyFields.includes("Name3") ? "error" : ""}
        />
        <div classname="pl-8">
          <div className="relative w-full lg:max-w-sm">
            Room:no
            <select
              className={emptyFields.includes("RoomNo") ? "error" : ""}
              value={RoomNo}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
            </select>
          </div>
        </div>
        <div className="pb-8">
          <button>Submit</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </>
  );
};

export default WorkoutForm;
