import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">QuickShift</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/workers">Workers</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
