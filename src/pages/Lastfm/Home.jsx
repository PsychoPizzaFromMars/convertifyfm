import React from 'react'

function Home() {
  return (
    <>
    <div>
        <h1>Welcome to ConvertifyFM</h1>
        <button id='btn-spotify' className="login" onClick={() => window.location='https://accounts.spotify.com/authorize?client_id=9a193d42fcb34f4bb0c92abca670c310&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fcallback&scope=user-read-email+user-library-read+playlist-read-private+user-top-read+playlist-modify-private+playlist-modify-public'}>Login Spotify</button>
    </div>
    </>
  )
}

export default Home