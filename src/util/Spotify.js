import SearchBar from "../Components/SearchBar/SearchBar";

const clientId = "";
const redirectURI = "http://localhost:3000/";

let usersToken;

const Spotify ={
  getAccessToken() {
    if(usersToken){
      return usersToken;
    }

    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);

      //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      //wipe the access token and URL parameters
      window.history.pushState('Access Token', null, '/');
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` ,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }
    ).then((response) => {
        return response.json();
    }).then( jsonResponse => {
      if (!jsonResponse) {
        return [];
      } 
      return jsonResponse.tracks.map( track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          URI: track.uri
        }
      })
    })
  },

  savePlaylist(name, trackUris){
    if(!name || !trackUris.length ){
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers =  {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers }
    ).then(response => response.json()
    ).then( jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify( {name: name})
      })
    }).then(response => response.json()
    ).then( jsonResponse => {
      playlistId = jsonResponse.id;
      return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify( {uris: trackUris})
      })
    } )
  },


}



export default Spotify;