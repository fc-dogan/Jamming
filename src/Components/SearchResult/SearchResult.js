import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResult.css';

class SearcResult extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList/>
      </div>
    );
  }
}

export default SearcResult;