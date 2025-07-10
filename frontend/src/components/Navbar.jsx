import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF5E4] shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-[#FF9494] text-3xl font-extrabold tracking-tight">
        Drivient
      </div>
      <nav>
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-[#FF9494] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-[#FF9494] transition">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-[#FF9494] transition">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
