import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SearchResult.css';

class SearcResult extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <Tracklist/>
      </div>
    );
  }
}

export default SearcResult;