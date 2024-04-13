import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="py-12 px-16 h-80vh">
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
