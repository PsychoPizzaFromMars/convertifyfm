import React, { Component } from 'react'
import TrackCard from '../../components/TrackCard';
import { filterTracks } from '../../services/helperFunctions';

const CONVERTIFY_API_BASE_URL = "http://localhost:8000";

async function fetchTracks(data = { user_id: "god_save_punk", limit: 10 }, endpoint = '/test/spotify_query') {
    const response = await fetch(`${CONVERTIFY_API_BASE_URL}${endpoint}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        console.log(error)
        return Promise.reject(error);
    }
    return await response.json();
}

// const filterTracks = (obj, predicate) =>
//     Object.keys(obj)
//         .filter(key => predicate(obj[key]))
//         .reduce((res, key) => (res[key] = obj[key], res), {});

export default class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isSpotifyAuthenticated: false,
            items: [],
            selectedCheckboxes: []
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleUncheckAll = this.handleUncheckAll.bind(this);
        this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this);
    }

    handleCheckbox(event) {
        const selectedCheckboxes = this.state.selectedCheckboxes;
        selectedCheckboxes[event.target.value] = event.target.checked;

        this.setState({
            selectedCheckboxes: selectedCheckboxes
        });
    };

    handleCheckAll() {
        const selectedCheckboxes = this.state.selectedCheckboxes;

        this.setState({
            selectedCheckboxes: Object.keys(selectedCheckboxes).reduce((o, key) => ({ ...o, [key]: true }), {})
        });
    }

    handleUncheckAll() {
        const selectedCheckboxes = this.state.selectedCheckboxes;
        
        this.setState({
            selectedCheckboxes: Object.keys(selectedCheckboxes).reduce((o, key) => ({ ...o, [key]: false }), {})
        });
    }

    handleSubmitPlaylist() {
        const selectedTracks = filterTracks(this.state.selectedCheckboxes, value => value == true);
        console.log(Object.keys(selectedTracks))

        fetch(`${CONVERTIFY_API_BASE_URL}/spotify/playlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(
                {
                    "tracks": Object.keys(selectedTracks)
                }
            )
        })

    }


    authenticateSpotify() {
        fetch(`${CONVERTIFY_API_BASE_URL}/is-authenticated`, {
            mode: 'cors',
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                console.log('Mounting');
                this.setState({ isSpotifyAuthenticated: data.status });
                console.log(this.state)
                console.log(data.status);
                console.log('Mounted');
                if (!data.status) {
                    fetch(`${CONVERTIFY_API_BASE_URL}/login`, {
                        mode: 'cors',
                        credentials: "include"
                    })
                        .then(response => response.json())
                        .then(data => {
                            // window.location.replace(data.url)
                        })
                }
            })
    }
    // handleCheck(event) {
    //     var updatedList = [...this.state.checked];
    //     if (event.target.checked) {
    //         updatedList = [...this.state.checked, event.target.id];
    //     } else {
    //         updatedList.splice(this.state.checked.indexOf(event.target.id), 1);
    //     }
    //     this.state.setChecked(updatedList);
    // };


    componentDidMount() {
        this.authenticateSpotify()

        fetch(`${CONVERTIFY_API_BASE_URL}/test/spotify_query`, {
            mode: 'cors',
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result,
                        selectedCheckboxes: result.map(result => result.uri).reduce((o, key) => ({ ...o, [key]: true }), {})
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    // componentDidMount() {
    //     fetchTracks()
    //         .then(
    //             (result) => {
    //                 console.log(result)
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: result
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // }

    // componentDidMount() {

    render() {
        const { error, isLoaded, items, isSpotifyAuthenticated, selectedCheckboxes } = this.state;
        const handleCheckbox = e => this.handleCheckbox(e)

        console.log({ error, isLoaded, isSpotifyAuthenticated, items, selectedCheckboxes })

        // if (isSpotifyAuthenticated) {
        //     if (error) {
        //         return <div>Ошибка: {error.message || error}</div>
        //     }
        //     else if(!isLoaded) {
        //         console.log('Rendering')
        //         return <div><div className="loader"></div>Loading...</div>
        //     } else {
        //         return (
        //             <div className="Tracks" style={{ marginLeft: "10vw" }}>
        //                 <button onClick={this.handleCheckAll}>Check All</button>
        //                 <button onClick={this.handleUncheckAll}>Uncheck All</button>
        //                 <button onClick={this.handleSubmitPlaylist}>Submit Tracks</button>
        //                 {
        //                     items?.map(function (item) {
        //                         return (
        //                             <TrackCard
        //                                 key={item.uri}
        //                                 track={item}
        //                                 onChange={handleCheckbox} checked={selectedCheckboxes[item.uri]} />
        //                         )

        //                     })
        //                 }
        //                 <button onClick={this.handleSubmitPlaylist}>Submit Tracks</button>
        //             </div>
        //         )

        //     }


        // } else {
        //     return <div>Not Done</div>
        // }
        return <div className="TrackCard">
            <div className="searchQuery">Result for "Bad Brains - Attitude"</div>
            <div class="Track-Container" id="spotify:track:24DaDLmSzMMmiQIwaU2BxA">
                <img className="Track-AlbumCover border" src="https://i.scdn.co/image/ab67616d00004851518d1a9d162cfce8a7db5c5e" alt="" />
                <div class="Track-Info">
                    <span class="Track-Name highlighted">Bad Brains - Attitude </span>
                    <span class="Track-AlbumName highlighted">Bad Brains</span>
                </div>
                <div class="Track-Choice">
                    <input class="Track-Checkbox" type="checkbox" id="chkbox-spotify:track:24DaDLmSzMMmiQIwaU2BxA" value="spotify:track:24DaDLmSzMMmiQIwaU2BxA" checked="" />
                    <label for="chkbox-spotify:track:24DaDLmSzMMmiQIwaU2BxA"></label>
                </div>
            </div>
        </div>

    }
    // render() {
    //     const { error, isLoaded, items } = this.state;
    //     if (error) {
    //         return <div>Ошибка: {error.message || error}</div>
    //     } else if (!isLoaded) {
    //         return <div>Загрузка...</div>
    //     } else {
    //         return (
    //             <div className="Tracks" style={{marginLeft: "10vw"}}>
    //                 {
    //                     items?.map(function (item) {
    //                         return (
    //                             <TrackCard track={item} />
    //                             // <p>{item}</p>
    //                         )

    //                     })
    //                 }
    //             </div>
    //         )
    //     }

    //     ;
    // }
}



// const tracklist = [
//     {
//         "artist": "Bad Brains",
//         "name": "Banned in D.C.",
//         "album_name": "Bad Brains",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e02518d1a9d162cfce8a7db5c5e",
//         "uri": "spotify:track:0YnP5BtP6lTwQV8gLOzaov"
//     },
//     {
//         "artist": "Tommy Cash",
//         "name": "Euroz Dollaz Yeniz",
//         "album_name": "Euroz Dollaz Yeniz",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e02ca8c10e2a478ffe9aa623b18",
//         "uri": "spotify:track:2wJ2gsMHkIoRpdcu9k1kNO"
//     },
//     {
//         "artist": "Bad Brains",
//         "name": "Don't Need It",
//         "album_name": "Bad Brains",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e02518d1a9d162cfce8a7db5c5e",
//         "uri": "spotify:track:0TrGNlBKj3oFBpUPurIhBU"
//     },
//     {
//         "artist": "No Age",
//         "name": "Sleeper Hold",
//         "album_name": "Nouns",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e0269e08f1e376646719ed3394d",
//         "uri": "spotify:track:2FjronTpJVHFTDH5gaC64w"
//     },
//     {
//         "artist": "Bad Brains",
//         "name": "Don't Bother Me",
//         "album_name": "Black Dots",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e023fdfe03811dd263aeff3076e",
//         "uri": "spotify:track:29sqgoWhw6KZawQCnDvSIB"
//     },
//     {
//         "artist": "Molchat Doma",
//         "name": "Дискотека / Discoteque",
//         "album_name": "Monument",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e026b44b2f4e9ba8d8ee31d36dd",
//         "uri": "spotify:track:1ttaRktw1hwz5KZ5YTZ2SJ"
//     },
//     {
//         "artist": "Bad Brains",
//         "name": "Send You No Flowers",
//         "album_name": "Black Dots",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e023fdfe03811dd263aeff3076e",
//         "uri": "spotify:track:2F68oFuz9Sgvkelpuh9J2g"
//     },
//     {
//         "artist": "Tommy Cash",
//         "name": "ProRapSuperstar",
//         "album_name": "Euroz Dollaz Yeniz",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e02ca8c10e2a478ffe9aa623b18",
//         "uri": "spotify:track:7aHouUs4yS6cXtvdvNHxgB"
//     },
//     {
//         "artist": "No Age",
//         "name": "Ripped Knees",
//         "album_name": "Nouns",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e0269e08f1e376646719ed3394d",
//         "uri": "spotify:track:67DDFcieCP57MENzMHdgHS"
//     },
//     {
//         "artist": "Tonstartssbandht",
//         "name": "Shot to La Parc",
//         "album_name": "Now I Am Become",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e023f1e4be65b5c26f44a32c922",
//         "uri": "spotify:track:3WvrKBddw2Uhl2oevorQp4"
//     },
//     {
//         "artist": "Flying Lotus",
//         "name": "Sleepy Dinosaur",
//         "album_name": "Los Angeles",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e026b3a70af8e425b93a457df0c",
//         "uri": "spotify:track:4WTwXiDs5j5pe4la3PsrFR"
//     },
//     {
//         "artist": "No Age",
//         "name": "Sun Spots",
//         "album_name": "Weirdo Rippers",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e02fdc611b843b760114da9a29a",
//         "uri": "spotify:track:1LtTmCGn4yiXpZu2co4q1w"
//     },
//     {
//         "artist": "Ty Segall Band",
//         "name": "The Bag I'm In",
//         "album_name": "Slaughterhouse",
//         "album_cover": "https://i.scdn.co/image/ab67616d00001e0223ef2e018a0f355bbc217bc8",
//         "uri": "spotify:track:7ki4CTazWzEFSQB7dXY172"
//     }
// ]

// fetchTracks().then(response => console.log(response));
