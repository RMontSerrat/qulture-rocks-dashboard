import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './pages/Users/Users'
import EditUser from './pages/EditUser/EditUser'
import CreateUser from './pages/CreateUser/CreateUser'
import CreateUserProvider from './providers/CreateUserProvider';
import UsersProvider from './providers/UsersProvider';
import EditUserProvider from './providers/EditUserProvider';

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
  </Router>

export default App;