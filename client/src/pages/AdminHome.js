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
      <h2 className="text-2xl font-bold text-black-500 mb-4">Make an announcement</h2>

      <form onSubmit={handleSubmit}>
      
      <textarea
  required
  rows="5" cols="80"
  value={announcement}
  onChange={(e) => setAnnouncement(e.target.value)}
  className={emptyFields.includes('announcement') ? 'error' : 'bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
  placeholder="Enter your announcement here..."
></textarea>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
  Done
</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
 
export default AdminHome;