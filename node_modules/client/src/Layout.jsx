import Footer from './pages/Footer'
import Header from './pages/Header'
import {Outlet} from "react-router-dom"

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'> 
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
