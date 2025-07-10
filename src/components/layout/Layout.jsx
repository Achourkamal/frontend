import { Outlet } from 'react-router-dom'
import Menu from '../menu/Menu.jsx'
import Footer from '../footer/Footer.jsx'

const Layout = () => {
  const userConnectedData = JSON.parse(localStorage.getItem('userConnectedData'))
  return (
    <div>
        <Menu />
        <Outlet/>
        <h1>Home Page</h1>
        <h2>Welcome {userConnectedData.user.name}</h2>
       <Footer/>
    </div>
  )
}

export default Layout