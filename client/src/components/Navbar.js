import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  const handleChat = () => {};

  console.log(user);
  return (
    <header>
      
      <div className="container">
        
        <a href="#" className="flex items-center">
          <img
            src="https://img.collegepravesh.com/2016/01/VJTI-Mumbai-Logo.png"
            className="h-6 mr-3 sm:h-20"
            alt="Flowbite Logo"
          />
         <span className="self-center text-xl font-bold whitespace-nowrap text-blue-900 dark:text-blue-800">
  <Link to="/" className="font-serif">
    <h1 className="font-bold text-xl">VJTI Hostel Portal</h1>
  </Link>
</span>

        </a>
        <nav className="px-4 py-2 items-center mt-4 ">
  {user && (
    <div className="flex space-x-4 font-semibold text-lg">
      <span className="text-blue-500">{user.email}</span>
      <span className="text-blue-500">{user.year}</span>
      {/* <Link to="/fees">FeePayment</Link> */}
      <Link to="/allot" className="">Allotment-list</Link>
      {user.year !== 2022 && <Link to="/home" className="">SY</Link>}
      {/* <Link to="/pass">Pass</Link> */}
      <Link to="/rules" className="">Hostel Rules</Link>
      {/* <Link to="/notification">Notification</Link> */}

      {/* <button onClick={handleChat}>Chat</button> */}
      {/* <Link to="/chatapp">Chat</Link> */}
      <Link to="/Complains" className="">Complaints</Link>
      <button onClick={handleClick} className="">Log out</button>
    </div>
  )}

  {!user && (
    <div className="flex space-x-4 font-semibold text-lg">
      <Link to="/login" className="mr-4">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  )}
</nav>

      </div>
    </header>
  );
};

export default Navbar;
