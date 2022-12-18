import { Link } from '@/components/Links/Link'

const MainNavbar = () => {
  return (
    <header className="flex items-center justify-between">
      <ul className="flex items-center gap-4 font-mono">
        <li>
          <Link className="p-2 hover:underline" to="/">
            /home
          </Link>
        </li>

        <li>
          <Link className="p-2 hover:underline" to="/test">
            /test
          </Link>
        </li>
        <li>
          <Link className="p-2 hover:underline" to="/posts/7">
            /dynamic
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default MainNavbar
