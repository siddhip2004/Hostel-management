import { Link } from 'react-router-dom'
import { useLogout2 } from '../hooks/useLogout2'
import { useAuthContext2 } from '../hooks/useAuthContext2'

const Navbar2 = () => {
  const { logout2 } = useLogout2()
  const { admin } = useAuthContext2()

  const handleClick = () => {
    logout2()
  }

  return (
    <header>
      <div className="container">
        <Link to="/admin/ad">
          <h1 className="font-bold text-xl">Admin Portal</h1>
        </Link>
        <nav className="px-4 py-2 items-center mt-4 ">
          {admin && (
            <div>
              <span className="text-blue-500">{admin.email}</span>
              <button onClick={handleClick}>Log out</button>
              <Link to="/admin/mer">Merit-List</Link>
            </div>
            
          )}
          {!admin && (
            <div>
              <Link to="/adminlogin">Login</Link>
              <Link to="/adminsignup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar2