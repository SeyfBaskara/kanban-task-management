import React from 'react'
import Image from 'next/image'
const Header = () => {
   return (
      <header className="w-screen flex items-center">
         <section className="hidden sm:flex w-48 shrink-0 p-3">
            <div>
               <Image src="/assets/logo-dark.svg" alt="logo" width={143} height={23} />
            </div>
         </section>
         <section className="flex w-screen justify-between items-center p-3 border-l-2 border-lightGrey">
            <div className="flex gap-3 items-center">
               <div className="sm:hidden">
                  <Image src="/assets/logo-mobile.svg" alt="logo" width={24} height={25} />
               </div>
               <div className="flex gap-2">
                  <h3 className="font-bold">Platform Launch</h3>
                  <div className="sm:hidden">
                     <Image src="/assets/icon-chevron-down.svg" alt="chevron icon" width={10} height={7} />
                  </div>
               </div>
            </div>
            <div className="flex gap-1 items-center sm:gap-4">
               <div className="bg-purple w-12 rounded-full text-center p-1 opacity-40 sm:hidden">
                  <Image src="/assets/icon-add-task-mobile.svg" alt="add icon" width={12} height={12} />
               </div>
               <div>
                  <button className="hidden rounded-full bg-purple py-2 px-3 text-white text-xs opacity-40 sm:block">
                     +Add New Task
                  </button>
               </div>
               <div className="relative w-1.5 h-5">
                  <Image src="/assets/icon-vertical-ellipsis.svg" alt="ellipsis icon" layout="fill" />
               </div>
            </div>
         </section>
      </header>
   )
}

export default Header
