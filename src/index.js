import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Login from './Login'
import Doctor from './Doctor'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { HashRouter, Route, Switch } from 'reac-router-dom'

const Index = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/App" exact component={App}/>
        <Route path="/Doctor" exact component={Doctor}/>
      </Switch>  
    </HashRouter>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
serviceWorker.register()
