import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="container header-content">

        <h1>CommunityHub</h1>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

      </div>
    </header>
  )
}

export default Header