import React from 'react'
import './Playlist.css'

class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tracks: [],
            tracksLoaded: false,
            errorMsg: null
        }
    }
    componentDidMount = () => {
        // fetch tracks using api
        const httpString = 'http://localhost:8000/tracks'
        fetch(httpString,{
            method: 'GET'
        }).then(response => {
            console.log(response)
            if (!response.ok) 
                throw new Error('Network response was not OK');
            return response.json()
        })
        .then(data => {
            console.log(data);

            document.getElementById('tracks').value = JSON.stringify(data.tracks)
            document.getElementById('tracks').click()
            
            // this.setState({tracks: data.tracks,tracksLoaded: true})
            this.setState({tracksLoaded: true})
        }).catch(error => {
            console.log(error)
            this.setState({tracksLoaded: true, errorMsg: 'Server Error'})
        })

    }
    deleteTrack = (index) => {
        console.log(index);
        const tracks = this.state.tracks
        const trackToDelete = tracks[index]

        const httpString = 'http://localhost:8000/tracks/' + trackToDelete.id
        fetch(httpString,{
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            tracks.splice(index, 1)
            document.getElementById('tracks').value = JSON.stringify(tracks)
            document.getElementById('tracks').click()
    
        })

    }
    playlistHTML = () => {
        const tracks = this.state.tracks?this.state.tracks:[]    
        console.log(tracks);
        if(!this.state.tracksLoaded)
            return <div className='m-4' style={{fontWeight: 'bold'}}>Loading...</div>
        if(this.state.errorMsg)
            return <div className='m-4' style={{color: 'darkred', fontWeight: 'bold'}}>{this.state.errorMsg}</div>
        if(tracks.length === 0)
            return <div className='m-4' style={{fontWeight: 'bold'}}>No Track Found</div>
        const rowHTML = tracks.map((track, index) => {
            return (
                <div key={index} className='list-group-item'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-10'>
                                <b>{track.title}</b>
                                <div>ID: {track.id}</div>
                                <div>Playlist: {track.playlist}</div>
                                <a href={track.uri}>{track.uri}</a>
                                <div>Master ID: {track.master_id}</div>    
                            </div>
                            <div className='col-2 text-right'>
                                <button className='btn btn-danger' onClick={() => this.deleteTrack(index)}>
                                    <i className='fas fa-trash'></i>    
                                </button>                            
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        let height = document.getElementById('ch-playlist').offsetHeight
        console.log(height)
        height = window.innerHeight*.85 - height
        console.log(height)
        return (
            <div className='overflow-y-auto' style={{height: height}}>
                <div className='list-group'>
                    {rowHTML}                    
                </div>
                </div>
            )
    }
    updateTracks = (event) => {
        console.log('update tracks');
        const tracks = JSON.parse(event.target.value)
        console.log(tracks);
        this.setState({tracks: tracks, tracksLoaded: true})
    }
    render(){
        return (
            <div className='playlist card'>
                <div className='card-header' id='ch-playlist'>
                    <h3>My PlayList</h3>
                </div>
                <input type='hidden' id='tracks' 
                    onClick={(event) => this.updateTracks(event)}></input>
                {this.playlistHTML()}
            </div>
        )
    }
}
export default Playlist