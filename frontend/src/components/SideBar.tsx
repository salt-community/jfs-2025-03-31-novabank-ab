import { Link } from '@tanstack/react-router'

export default function SideBar() {
  return (
    <nav className="fixed left-1 bg-amber-300">
      <div className="px-2 font-bold">
        <Link to="/">Home</Link>
      </div>
      <div className="px-2 font-bold">
        <Link to="/">Home</Link>
      </div>
    </nav>
  )
}
