import { Outlet } from 'react-router-dom'
import NavBar from './components/nav-bar'

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App;
