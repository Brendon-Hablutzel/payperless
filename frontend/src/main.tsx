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
import SavedRecipes from './components/SavedRecipes.tsx'
import SustainabilityLeaderboard from './components/SustainabilityLeaderboard'
import Receipt from './components/Receipt.tsx'
import NewRecipe from './components/NewRecipe.tsx'
import ExploreRecipes from './components/ExploreRecipes.tsx'
import UserProfile from './components/UserProfile.tsx'

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
        path: 'receipts/:id',
        element: <Receipt />,
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
      {
        path: 'saved-recipes',
        element: <SavedRecipes />,
      },
      {
        path: 'new-recipe',
        element: <NewRecipe />,
      },
      {
        path: 'explore-recipes',
        element: <ExploreRecipes />,
      },
      {
        path: 'profile/:userId',
        element: <UserProfile />,
      },
      {
        path: 'sustainability',
        element: <SustainabilityLeaderboard />,
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
