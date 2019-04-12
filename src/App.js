import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './pages/Users/Users'
import EditUser from './pages/EditUser/EditUser'
import CreateUser from './pages/CreateUser/CreateUser'
import CreateUserProvider from './providers/CreateUserProvider';
import UsersProvider from './providers/UsersProvider';
import EditUserProvider from './providers/EditUserProvider';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

const App = () =>
  <Router>
    <UsersProvider>
      <Route exact path="/" component={Users} />
    </UsersProvider>
    <EditUserProvider>
      <Route path="/user/:id" component={EditUser} />
    </EditUserProvider>
    <CreateUserProvider>
      <Route path="/create" component={CreateUser} />
    </CreateUserProvider>
    <GlobalStyle />
  </Router>

export default App;