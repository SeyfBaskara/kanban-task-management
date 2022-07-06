import React from 'react'
import Image from 'next/image'
const Header = () => {
   return (
      <header className="flex gap-1 p-3 container ">
         <section className="hidden">
            <div>
               <Image src="/assets/logo-light.svg" alt="logo" width={153} height={26} />
            </div>
         </section>
         <section className="flex justify-between items-center container ">
            <div className="flex gap-3 items-center">
               <div>
                  <Image src="/assets/logo-mobile.svg" alt="logo" width={24} height={25} />
               </div>
               <div className="flex gap-2">
                  <h3 className="font-bold">Platform Launch</h3>
                  <div>
                     <Image src="/assets/icon-chevron-down.svg" alt="chevron icon" width={10} height={7} />
                  </div>
               </div>
            </div>
            <div className="flex gap-4 items-center">
               <div className="bg-purple w-12 rounded-full text-center p-1 opacity-40">
                  <Image src="/assets/icon-add-task-mobile.svg" alt="add icon" width={12} height={12} />
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
