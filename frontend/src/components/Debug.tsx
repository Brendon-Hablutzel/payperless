import { Link } from 'react-router-dom'

const Debug = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/scan">scan</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
    </div>
  )
}

export default Debug
