import { Outlet } from 'react-router-dom'
import Header from './user/Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="py-12">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );  
}

export default Layout
