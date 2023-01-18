import {React, useRef } from 'react'

function SubmitPlaylistForm({ handleSubmit, handleInputChange, formData, ref }) {
    const scollToRef = useRef();
    return (
        <div className="form-container">
            <form id="playlist-submit-form" className="border-comic" onSubmit={handleSubmit}>
                <p>Playlist name</p>
                <div className="row-container">
                    <input
                        type="text"
                        name="playlistName" id=""
                        value={formData.playlistName}
                        onChange={handleInputChange}
                        required />
                </div>
                <p>Description</p>
                <div className="row-container">
                    <input
                        type="text"
                        name="playlistDesc" id=""
                        value={formData.playlistDesc}
                        onChange={handleInputChange}
                        required />
                </div>
                <button type="submit" id="submit-playlist">Create Playlist</button>
            </form>
        </div>
    )
}

export default SubmitPlaylistForm