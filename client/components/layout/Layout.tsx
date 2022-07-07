import React from 'react'
import Header from './Header'
import SideBar from './SideBar'

const Layout = ({ children }: any): JSX.Element => {
   return (
      <>
         <Header />
         <main className="flex">
            <SideBar />
            {children}
         </main>
      </>
   )
}

export default Layout
