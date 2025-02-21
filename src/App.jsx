import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from "./layouts/MainLayout"
import Dashboard from './pages/Dashboard';
import AddWeek from './pages/Week/AddWeek';
import ListWeek from './pages/Week/ListWeek';
import { HelmetProvider } from 'react-helmet-async';
import AddChallenge from './pages/SubChallenges/AddSubChallenge';
import ListChallenge from './pages/SubChallenges/ListSubChallenge';
import AddProduct from './pages/Product/AddProduct';
import ListProduct from './pages/Product/ListProduct';
import AddRewardCategory from './pages/RewardCategory.jsx/addRewardCategory';
import ListRewardCategory from './pages/RewardCategory.jsx/listRewardCategory';
import AddRewards from './pages/Rewards/AddRewards';
import ListRewards from './pages/Rewards/ListReward';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route path='/' element={<MainLayout />}>

              <Route index element={<Navigate to="/dashboard" />} />
              
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='week/add' element={<AddWeek />} />
              <Route path='week/list' element={<ListWeek />} />
              <Route path='challenges/add' element={<AddChallenge />} />
              <Route path='challenges/list' element={<ListChallenge />} />
              <Route path='product/add' element={<AddProduct />} />
              <Route path='product/list' element={<ListProduct />} />
              {/* <Route path='rewardcategory/add' element={<AddRewardCategory />} /> */}
              {/* <Route path='rewardcategory/list'
               element={<ListRewardCategory /> }/> */}
              <Route path='rewards/add' element={<AddRewards />} />
              <Route path='rewards/list' element={ <ListRewards/> } />
            </Route>
          </Routes>
        </HelmetProvider >
      </BrowserRouter>
    </>
  )
}

export default App
