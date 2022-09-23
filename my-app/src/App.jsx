import './App.css';

import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import React from 'react';
import LoadPage from './pages/LoadPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Basket from './Basket';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      // pageDisplayed: "HomePage"
      user: JSON.parse(sessionStorage.getItem("user"))
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <LoginPage></LoginPage>
      )
    }
    else {
      return (
        <div className="App container">


          <BrowserRouter>
            <Routes>
              <Route path='/' element={<NavBar></NavBar>}>
                <Route index element={<HomePage></HomePage>}></Route>
                <Route path='loadPage' element={<LoadPage></LoadPage>}></Route>
                <Route path='basket' element={<Basket></Basket>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>

          {/* <NavBar openPage={this.openPage}></NavBar>
        {this.state.pageDisplayed === "HomePage" && <HomePage />}
        {this.state.pageDisplayed === "LoadPage" && <LoadPage />} */}
        </div>
      );
    }
  }
}

export default App;