import React, { useEffect } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getEventDetails } from '../../actions/eventAction';
import './index.scss';

const EventPage = ({
  match,
  loadEvent,
  currentEvent,
  currentState,
  currentMarkets,
  currentContracts
}) => {
  const {
    params: { eventId }
  } = match;

  useEffect(() => {
    loadEvent(eventId);
  }, []);

  return (
    <div className="event-page">
      <div className="header">
        <div className="title">{currentEvent.name}</div>
        <div className="property-item">
          <div className="sub-title">Description:</div>
          <div className="sub-value">
            {currentEvent.description || 'No description.'}
          </div>
        </div>
        <div className="property-item">
          <div className="sub-title">State:</div>
          <div className="sub-value">{currentEvent.state}</div>
        </div>
        <div className="property-item">
          <div className="sub-title">Start Date:</div>
          <div className="sub-value">
            {moment(currentEvent.start_date).format('MM-DD-YYYY')}
          </div>
        </div>
        <div className="property-item">
          <div className="sub-title">Modified Date:</div>
          <div className="sub-value">
            {moment(currentEvent.modified).format('MM-DD-YYYY')}
          </div>
        </div>
        <div className="property-item">
          <div className="sub-title">Type:</div>
          <div className="sub-value">{currentEvent.type}</div>
        </div>
        <div className="property-item">
          <div className="sub-title">Bettable:</div>
          <div className="sub-value">
            {currentEvent.bettable ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="property-item">
          <div className="sub-title">Has League Table:</div>
          <div className="sub-value">
            {currentState.has_league_table ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      <div className="main">
        <div className="markets">
          <div className="title">Markets</div>
          {currentMarkets.map(market => (
            <div className="market-item" key={market.id}>
              <div className="name">{market.name}</div>
              <div className="contents">
                <div className="type">
                  Market Type: {market.market_type.name}
                </div>
                <div className="status">Status: {market.state}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="contracts">
          <div className="title">Contracts</div>
          {currentContracts.map(contract => (
            <div className="contract-item" key={contract.id}>
              <div className="name">{contract.name}</div>
              <div className="contents">
                <div className="type">
                  Contract Type: {contract.contract_type.name}
                </div>
                <div className="status">
                  State or outcome: {contract.state_or_outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadEvent: eventId => dispatch(getEventDetails(eventId))
});

const mapStateToProps = ({ eventReducer }) => ({
  currentEvent: eventReducer.currentEvent,
  currentState: eventReducer.currentState,
  currentMarkets: eventReducer.currentMarkets,
  currentContracts: eventReducer.currentContracts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EventPage));
