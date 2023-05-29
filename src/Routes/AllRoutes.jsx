import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { PostTable } from '../Components/PostTable'
import { GridLayout } from '../Components/GridLayout'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostTable />} />
      <Route path="/gridlayout" element={<GridLayout />} />
    </Routes>
  )
}
