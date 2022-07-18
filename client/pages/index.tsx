import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Board from 'components/Board'
import { wrapper } from 'app/store'
import AddBoard from 'components/screenModals/AddBoard'
import DeleteBoard from 'components/screenModals/DeleteBoard'

import { useAppSelector } from 'app/hooks'
import { addBoard } from 'app/features/boardSlice'

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
                  ? 'fixed w-full h-full top-14 bg-black opacity-30 z-40'
                  : isLightbox
                  ? 'fixed w-full h-full left-0 bg-black opacity-30 z-40'
                  : ''
            }`}
         ></div>
         <Board />
         <AddBoard />
         <DeleteBoard />
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
   const response = await fetch('http://localhost:5000/api/board')

   const data = await response.json()

   store.dispatch(addBoard(data))
})

export default Home
