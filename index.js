require('./js/Message.js')
require('./sass/styles.scss')

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import Message from './modules/Message'
import Login from './modules/Login'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo} />
      </Route>
      <Route path="/about" component={About} />
      <Route path="/message" component={Message} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))
