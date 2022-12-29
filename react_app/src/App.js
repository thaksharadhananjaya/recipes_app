import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Signin from './pages/signin/signin';
import PrivateRoute from './components/HOC/private_route';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth_actions';
import RecipeView from './pages/recipe_view/recipe_view';
import Signup from './pages/signup/signup';
import PageNotFound from './pages/page_not_found/page_not_found';



function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn());
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
          <Route path="/recipe/:id" exact element={
            <PrivateRoute>
              <RecipeView />
            </PrivateRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
