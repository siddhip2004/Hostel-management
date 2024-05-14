import { useEffect, useState } from "react";

const Notification = () => {

  const[ notifi, setNotifi]= useState("")
  useEffect(() => {
    const fetchNotifi = async () => {
      const response = await fetch('http://localhost:4000/api/user/notification')
      const json = await response.json()
  
      if (response.ok) {
        setNotifi(json)
        console.log(notifi)
      }
    }
    fetchNotifi()
  },[])
  

    return ( 
        <>

        
<div className="bgColour">
  <div
    
    className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <span className="fontmedium">Notification alert!</span> Behold!!!

    <div>
{notifi && notifi.map((not) => (
  <div key={not._id}>
  <div>
    {not.announcement}
  </div>
  </div>))}
    </div>

 
  </div>
</div>
  
  
</>

     );
}
 
export default Notification;