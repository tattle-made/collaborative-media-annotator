import React from 'react'
import {Grommet, Box} from 'grommet'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Assignments from './pages/Assignments'
import Assignment from './pages/Assignment'
import Home from './pages/Home'

function App() {
  return (
    <Grommet full>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/assignments">assignments</Link>
              </li>
              <li>
                <Link to="/assignment">assignment</Link>
              </li>
            </ul>
          </nav>
 
          <Box>
            <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/assignments">
                <Assignments/>
              </Route>
              <Route path="/assignment">
                <Assignment/>
              </Route>
            </Switch>
          </Box>
                 </Router>
    </Grommet>
  )
}

export default App
