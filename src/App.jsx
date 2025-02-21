import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MainLayout from "./layouts/MainLayout"
import Dashboard from './pages/Dashboard';
import AddChallenge from './pages/Challenges/AddChallenge';
import ListChallenge from './pages/Challenges/ListChallenge';
import { HelmetProvider } from 'react-helmet-async';
import AddSubChallenge from './pages/SubChallenges/AddSubChallenge';
import ListSubChallenge from './pages/SubChallenges/ListSubChallenge';
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
              <Route path='challenges/add' element={<AddChallenge />} />
              <Route path='challenges/list' element={<ListChallenge />} />
              <Route path='subchallenges/add' element={<AddSubChallenge />} />
              <Route path='subchallenges/list' element={<ListSubChallenge />} />
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
