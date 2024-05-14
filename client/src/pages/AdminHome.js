import { useState } from "react";
// import { createannouncement } from "../../../Backend/controllers/notificationController";
//import { create } from "../../../Backend/models/workoutModel";
import { useAuthContext2 } from "../hooks/useAuthContext2"

const AdminHome = () => {
  const [announcement, setAnnouncement] = useState('');
  const { admin } = useAuthContext2();
  const [emptyFields, setEmptyFields]=useState([])
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin) {
      setError('You must be logged in')
      return
    }
    //await createannouncement(announcement);
    // const ann = { announcement };

    // fetch('http://localhost:4000/api/admin/ad', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     announcement: ann.announcement
    //   })
    // }).then((res) => {
    //     console.log("announcement made")
    //     return res.json()
    //  })

    const ann = {announcement}

    const response = await fetch('http://localhost:4000/api/admin/add', {
      method: 'POST',
      body: JSON.stringify(ann),
      headers: {
          'Content-Type': 'application/json'
      }
  })

    const json = await response.json()

    if(!response.ok) 
    {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }

    if(response.ok)
      {
        setAnnouncement('')
        setEmptyFields([])
        setError(null)
      }

  }

  return (
    <div className="announcement-box" >
      <h2>Make an announcement</h2>
      <form onSubmit={handleSubmit}>
      
        <textarea
          required
          rows="5" cols="80"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className={emptyFields.includes('announcement') ? 'error' : ''}
        ></textarea>
        <button>Done</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
 
export default AdminHome;