import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import EventPage from './pages/event';
import './App.scss';

class App extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/:eventId" component={EventPage}></Route>
        </Switch>

        {loading && (
          <div className="loading">
            <img src="/assets/images/loading.gif" alt="No" />
          </div>
        )}
      </Router>
    );
  }
}

const mapStateToProps = ({ eventReducer }) => ({
  loading: eventReducer.loading
});

export default connect(mapStateToProps)(App);
