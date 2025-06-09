import { Link } from '@tanstack/react-router'

export default function SideBar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-amber-300 text-center">
      <div className="px-2 font-bold ">
        <Link to="/">Home</Link>
      </div>
      <ul className="list-none content-center">
        <li>Account</li>
        <li>Transaction</li>
      </ul>
      <div className="px-2 font-bold content-end">
        <Link to="/settings">Settings</Link>
      </div>
    </aside>
  )
}
