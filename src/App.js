import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import User from './pages/User/User'
import Create from './pages/Create/Create'
import { HomeContainer, UserContainer } from './store/modules';

const App = () =>
  <Router>
    <HomeContainer>
      <Route exact path="/" component={Home} />
    </HomeContainer>
    <UserContainer>
      <Route path="/create" component={Create} />
      <Route path="/user/:id" component={User} />
    </UserContainer>
  </Router>

export default App;