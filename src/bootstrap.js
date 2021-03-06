import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import history from './history';
import requireAuth from './components/requireAuth';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import Layout from './components/layout';
import Dashboard from './components/dashboard';

import './style/main.scss';
import NewNewsletter from './components/newsletter/newsletterNew';
import EditNewsletter from './components/newsletter/newsletterEdit';
import NewsletterDetail from './components/newsletter/newsletterDetail';

import NewRequest from './components/requests/requestsNew';

const createStoreWithMiddleware = applyMiddleware(thunk)(compose((window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)));

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={history}>
        <Switch>
          <Layout>
            <Route path='/' exact component={SignIn}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>

            {/* <Route path='/dashboard' component={Dashboard}/> */}
            <Route path='/dashboard' component={requireAuth(Dashboard)}/>

            <Route path='/newsletter/new' component={requireAuth(NewNewsletter)}/>
            <Route path='/newsletter/edit/:id' component={requireAuth(EditNewsletter)}/>
            <Route path='/newsletter/detail/:id' component={requireAuth(NewsletterDetail)}/>

            <Route path='/requests/new' component={requireAuth(NewRequest)}/>
          </Layout>
        </Switch>
      </Router>
    </Provider>,
    document.querySelector(".app-wrapper"));
}

document.addEventListener("DOMContentLoaded", main);
