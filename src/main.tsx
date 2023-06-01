import React from 'react'
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Account from './Pages/Account';
import AddListing from './Pages/AddListing';
import Listings from './Pages/Listings';
import Listing from './Pages/Listing';
import Chat from './Pages/Chat';
import Order from './Pages/Order';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/account',
    element:<Account/>
  },
  {
    path:'/add-listing',
    element:<AddListing/>
  },
  {
    path:"/listings",
    element:<Listings/>
  },
  {
    path:"/listing",
    element:<Listing/>
  },
  {
    path:"/chat",
    element:<Chat/>
  },
  {
    path:"/order",
    element:<Order/>
  },
  {
    path:"/privacy-policy",
    element:<PrivacyPolicy/>
  },
  {
    path:"/terms-and-conditions",
    element:<TermsAndConditions/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
)
