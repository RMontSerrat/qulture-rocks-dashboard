import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Repositories from './pages/Repositories/Repositories'
import { StoreContainer, UserContainer } from './store';

const App = () =>
  <Router>
    <StoreContainer>
      <Route exact path="/" component={Home} />
    </StoreContainer>
    <UserContainer>
      <Route path="/user/:id" component={Repositories} />
    </UserContainer>
  </Router>

export default App;