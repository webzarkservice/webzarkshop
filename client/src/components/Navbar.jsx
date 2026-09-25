import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-primary text-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-wide">
          Webzark Shop
        </Link>
        {/* <Link
          to="/admin/login"
          className="text-sm bg-secondary px-3 py-1.5 rounded-full hover:opacity-90 transition"
        >
          Admin
        </Link> */}
      </div>
    </header>
  );
}
