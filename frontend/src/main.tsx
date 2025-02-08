import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Scan from './components/Scan.tsx'
import Debug from './components/Debug.tsx'
import MyReceipts from './components/MyReceipts.tsx'
import Login from './components/Login.tsx'
import ViewReceipt from './components/ViewReceipt.tsx'
import App from './components/App.tsx'
import ShareReceipt from './components/ShareReceipt.tsx'
import SharedReceipt from './components/SharedReceipt.tsx'
import Layout from './components/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/receipt/:id',
    element: <SharedReceipt />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'debug',
        element: <Debug />,
      },
      {
        path: 'user-home',
        element: <MyReceipts />,
      },
      {
        path: 'receipts/:id/image',
        element: <ViewReceipt />,
      },
      {
        path: 'scan',
        element: <Scan />,
      },
      {
        path: 'share-receipt/:id',
        element: <ShareReceipt />,
      },
    ],
  },
])

// TODO: errorElement

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
