import React from 'react';
import Playlist from '../Playlist/Playlist'

class SearcResult extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <Playlist/>
      </div>
    );
  }
}

export default SearcResult;