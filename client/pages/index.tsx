import type { NextPage } from 'next'
import Head from 'next/head'
import Board from 'components/Board'
import AddBoard from 'components/screenModals/AddBoard'
import { useAppSelector } from 'app/hooks'

const Home: NextPage = () => {
   const { isHide, isLightbox } = useAppSelector((state) => state.board)

   return (
      <div className="w-full">
         <Head>
            <title>Kanban Task Management</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/assets/favicon-32x32.png" />
         </Head>
         <div
            className={`${
               isLightbox && isHide
                  ? 'fixed w-full h-full bg-black opacity-30 z-40'
                  : isLightbox
                  ? 'fixed w-full h-full bg-black top-0 opacity-30 z-40'
                  : ''
            }`}
         ></div>
         <Board />
         <AddBoard />
      </div>
   )
}

export default Home
