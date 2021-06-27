import { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';

class App extends Component { // ROOT component
  
  render() {  
      
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignInSide} />
            <Route path="/home" component={Homepage} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App; // exports component, can be made available to other components with import