import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPopularEvents } from '../../actions/eventAction';
import './index.scss';

const HomePage = ({ loadPopularEvents, events, history }) => {
  useEffect(() => {
    loadPopularEvents('football');
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="title">Football</div>
      {events.map(event => (
        <div
          key={event.id}
          className="event-item"
          onClick={() => history.push(`/${event.id}`)}
        >
          <div className="event-name">{event.name}</div>

          <div className="contents">
            <div className="description">
              {event.description || 'No description.'}
            </div>
            <div className="status">{event.state}</div>
            <div className="date">
              {moment(event.modified).format('MM-DD-YYYY')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadPopularEvents: sportName => dispatch(getPopularEvents(sportName))
});

const mapStateToProps = ({ eventReducer }) => ({
  events: eventReducer.events
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomePage));
