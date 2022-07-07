import React from 'react'
import Header from './Header'
import SideBar from './SideBar'

const Layout = ({ children }: any): JSX.Element => {
   return (
      <>
         <Header />
         <main className="flex flex-row-reverse">
            {children}
            <SideBar />
         </main>
      </>
   )
}

export default Layout
