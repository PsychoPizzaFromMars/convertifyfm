import React, { Component } from 'react'

const CONVERTIFY_API_BASE_URL = "http://localhost:8000";
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
                error: null,
                isLoaded: false,
                isSpotifyAuthenticated: false,
            },

            items: [],
            selectedCheckboxes: [],
            formData: {
                username: '',
                dateStart: '2000-01-01',
                dateEnd: '2022-01-01',
                tracksNum: '50',
                pageNum: '1',
            }
        };
    }

    handleInputChange = (event) => {
        const formData = {...this.state.formData}
        formData[event.target.name] = event.target.value

        this.setState(prevState => ({
            ...prevState,
            formData: formData         
            })
        )
        console.log(this.state.formData)
    }

    handleSearchButtonClick = (event) => {
        event.preventDefault()
        const formData = {...this.state.formData}

        fetch(`${CONVERTIFY_API_BASE_URL}/lastfm/user_weekly_charts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(
                {
                    user_id: formData.username,
                    date_from: (new Date(formData.dateStart).getTime()/1000).toString(),
                    date_to: (new Date(formData.dateEnd).getTime()/1000).toString(),
                    page: formData.pageNum
                }
            )
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }



    render() {
        const formData = this.state.formData
        const handleInputChange = this.handleInputChange
        const handleSearchButtonClick = this.handleSearchButtonClick
        return (
            <main>
                <form action="" className="border-comic">
                    <p>Last.fm username:</p>
                    <input 
                    type="text" 
                    name="username" id="" 
                    value={formData.username} 
                    onChange={handleInputChange} />

                    <p>Time range:</p>

                    <label htmlFor="date-start">From:</label>
                    <input 
                    type="date" 
                    name="dateStart" 
                    id="date-start" 
                    value={formData.dateStart} 
                    onChange={handleInputChange} />

                    <label htmlFor="date-start">To:</label>
                    <input 
                    type="date" 
                    name="dateEnd" 
                    id="date-end" 
                    value={formData.dateEnd} 
                    onChange={handleInputChange} />

                    <p>Number of tracks:</p>
                    <input 
                    type="number" 
                    name="tracksNum" 
                    id="tracks-num" 
                    value={formData.tracksNum} 
                    onChange={handleInputChange} />
                    
                    <p>Page #:</p>
                    <input 
                    type="number" 
                    name="pageNum" 
                    id="page-num" 
                    value={formData.pageNum} 
                    onChange={handleInputChange} />

                    <button type="submit" id="search" onClick={handleSearchButtonClick} >Search</button>
                </form>
            </main>
        )
    }
}
