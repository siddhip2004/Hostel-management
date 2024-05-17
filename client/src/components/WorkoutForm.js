import { useState, useHistory } from "react";
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
      useHistory.push("/chat");
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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      // backgroundImage:'url("https://static.zollege.in/public/college_data/images/campusimage/14388420336.PNG")',
     
      // backgroundSize: 'cover', 
      // backgroundPosition: 'center' 
    }}>
      <form className="create" onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
        backgroundColor: 'white',
        maxWidth: '400px',
        width: '100%',
        backdropFilter: 'blur(10px)', /* Optional: Adds a blur effect to the background */
      }}>
        <h3>Add RoomMates</h3>

        <label>Room Mate-1:</label>
        <input
          type="text"
          onChange={(e) => setName1(e.target.value)}
          value={Name1}
          className={emptyFields.includes("Name1") ? "error" : ""}
          style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <label>Room Mate-2:</label>
        <input
          type="text"
          onChange={(e) => setName2(e.target.value)}
          value={Name2}
          className={emptyFields.includes("Name2") ? "error" : ""}
          style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <label>Room Mate-3:</label>
        <input
          type="text"
          onChange={(e) => setName3(e.target.value)}
          value={Name3}
          className={emptyFields.includes("Name3") ? "error" : ""}
          style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <label>Room no:</label>
        <select
          className={emptyFields.includes("RoomNo") ? "error" : ""}
          value={RoomNo}
          onChange={handleChange}
          style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
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
        </select>

        <button style={{ marginTop: '20px', padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>Submit</button>
        {error && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;

