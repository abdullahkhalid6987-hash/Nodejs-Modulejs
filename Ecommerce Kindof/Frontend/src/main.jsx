import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import { Home, Login, ProductList, Register, UserList, UserProfile, AddProduct, Cart} from './Components'
import { UserContextProvider } from './Context/userContext'
import { userSession } from './Services/User'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<Layout/>}>
      <Route path="" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/userList" element={<UserList/>} />
      <Route path="/userProfile" element={<UserProfile/>} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/addProduct" element={<AddProduct/>} />
      <Route path="/cart" element={<Cart/>} />
    </Route>
  )
)

function Main(){
  const [user, setUser] = useState()


  return(
    <UserContextProvider value = {{user, setUser}}>
       <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Main/>
  </StrictMode>,
)
