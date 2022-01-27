import React from 'react'
import './Discogs.css'

class Discogs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchString: '',
            searchResults : null,
            playlist: null,
            pagination: null,
            resultsLoaded: null,
            errorMsg: null
        }
    }
    componentDidMount = () => {
        // fetch genres
        const httpString = 'http://localhost:8000/playlists'
        fetch(httpString,{
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({playlist: data.playlist})
        })

    }
    onSearchStringChange = (event) => {
        this.setState({
            searchString: event.target.value
        })
    }
    addTrack = (id) => {
        // console.log("add "+index);
        // console.log("genre "+document.getElementById('genre-add-track-'+index).value);
        // const result = this.state.searchResults[parseInt(index)]
        const result = this.state.searchResults.filter(element => {
            return element.id === id
        })[0]
        const playListId = document.getElementById('genre-add-track-'+id).value
        const playlist = this.state.playlist.reduce((total,playlist) => {
            return total + (playlist.id === parseInt(playListId)?playlist.title:'')
        }, '')
        if(document.getElementById('add-to-playlist-' + id).getAttribute('disabled')){
            console.log('event')
            return
        }
            const trackPayload = {
            playlist_id: parseInt(playListId),
            title: result.title,
            uri: 'http://www.discogs.com'+result.uri,
            // id: result.id,
            master_id: result.master_id,
        } 
        const httpString = 'http://localhost:8000/tracks'
        fetch(httpString,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(trackPayload)
        }).then(response => response.json())
        .then(data => {
            console.log(data);

        // UI Add
        const track = {
            title: result.title,
            id: data.id,
            playlist: playlist,
            uri: 'http://www.discogs.com'+result.uri,
            master_id: result.master_id,
        }
        // console.log(track);
        const trackInput = document.getElementById('tracks') 
        const tracks = JSON.parse(trackInput.value)
        // console.log('tracks', tracks);
        tracks.push(track)
        trackInput.value = JSON.stringify(tracks)
        trackInput.click()
        const addButton = document.getElementById('add-to-playlist-' + result.id)
        addButton.innerHTML 
        = `<span>Added to Playlist<i class='fas fa-check ml-2' /></span>`
        addButton.classList.remove('btn-primary')
        addButton.classList.add('btn-dark')
        addButton.setAttribute('disabled', true)
       })

 
    }
    search = (page = null) => {
        this.setState({resultsLoaded: false})
        const perPageLimit = 5
        const httpString = 'https://api.discogs.com/database/search?key=hybciPmmpRxvHZxzocYQ'+
        '&secret=oCrCIqLZtAdOXocIIWkaKOVOFUqPCYzW&artist='+this.state.searchString+'&country=canada%22'+
        '&per_page=' + perPageLimit + (page?'&page='+page:'')
        fetch(httpString,{
            method: 'GET'
        }).then(response => 
        {
            if(!response.ok)
                throw new Error('Network Problem')
            return response.json()
        })
        .then(data => {
            console.log(data);
            this.setState({
                searchResults: data.results,
                pagination: data.pagination,
                resultsLoaded: true
            })
        }).catch(error => {
            this.setState({
                resultsLoaded: true,
                errorMsg: 'Problem Fetching Data'
            })
        })
    }
    resultsHTML = () => {
        const searchResults = this.state.searchResults
        if(this.state.resultsLoaded == null){
            return ''
        }
        if(this.state.resultsLoaded === false){
            return <h5 className='m-3 pl-2'>Loading...</h5>
        }
        if(this.state.resultsLoaded && this.state.errorMsg){
            return <h5 className='m-3 pl-2' style={{color: 'darkred'}}>{this.state.errorMsg}</h5>
        }
        if(this.state.pagination.items === 0){
            return <h5 className='m-3 pl-2'>No Results Found</h5>
        }
        const rowHTML = searchResults.map((result, index) => {
            const playlistOptions = this.state.playlist.map((playlist) => {
                return (<option key={playlist.id} value={playlist.id}>{playlist.title}</option>)
            })
            return (
                <div className='list-group-item' key={result.id}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-3'>
                                <img className='img-fluid' src={result.thumb?result.thumb:'placeholder-music.jpg'} alt='cover'/>
                            </div>
                            <div className='col-5'>
                                <b>{result.title}</b>
                                <div>Master Id: {result.master_id}</div>
                                <div>style: {result.style}</div>
                                <div>format(s): {result.format.join(',')}</div>
                                {result.year?<div>Canada - {result.year}</div>:''}
                                <div>id: {result.id}</div>
                                {/* <div>uri: {result.uri}</div> */}
                                <a href={'http://www.discogs.com'+result.uri}>More Information</a>
                            </div>
                            <div className='col-4 text-right'>
                                <span>
                                    <select id={'genre-add-track-' + result.id} 
                                        className="form-control form-control-sm mb-3">
                                        {playlistOptions}
                                    </select>    
                                    <button className='btn btn-primary' 
                                        id={'add-to-playlist-' + result.id} 
                                        onClick={() => this.addTrack(result.id)}>
                                        Add to Playlist
                                        <i className='fas fa-add ml-2'></i>
                                    </button>

                                </span>    
                                
                            </div>                    
                        </div>                    

                    </div>                    
                </div>
            )
        })
        let height = document.getElementById('ch').offsetHeight + document.getElementById('cb').offsetHeight
        // console.log(height)
        height = window.innerHeight*.85 - height -16
        // console.log(height)
        return (
            <div className='overflow-y-auto' style={{height: height}}>
                <div className='list-group px-2 pb-2 overflow-auto'>
                    {rowHTML}
                </div>

            </div>

        )
    }
    render(){
        return (
            <div className='discogs card'>
                <div className='card-header' id='ch'>
                    <h3>Music provided by Discogs.com</h3>
                </div>
                <div className='card-body py-3' id='cb'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Search by  <b className='ml-1'> Artist</b></div>
                                    </div>
                                    <input className='search__input form-control' type='text' name='search' 
                                        onChange={(event) => this.onSearchStringChange(event)} 
                                        value={this.state.searchString}/>   
                                    <button className='btn btn-success mr-2 ml-1' onClick={() => this.search()}
                                        disabled={this.state.searchString?false:true}>
                                        <i className='fas fa-search'></i>
                                    </button>
                                    <small id="help-text" className="form-text text-muted mr-2">
                                        Canadian releases only
                                    </small> 
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className='ml-3'>
                        {this.state.pagination && this.state.pagination.items?
                        'Showing '+ ((this.state.pagination.page-1)*this.state.pagination.per_page +1) + ' - '
                        + (this.state.pagination.page)*this.state.pagination.per_page
                        +' of ' + this.state.pagination.items + ' results'
                        :''}
                        {this.state.pagination && this.state.pagination.items
                            && this.state.pagination.page !== 1?
                            <button className='btn btn-light btn-sm mx-1'
                                onClick={() => this.search(this.state.pagination.page - 1 )}>
                                <i className='fas fa-chevron-left'></i>
                            </button>
                            :''
                        }
                        {this.state.pagination && this.state.pagination.items
                            && this.state.pagination.page !== this.state.pagination.pages?
                            <button className='btn btn-light btn-sm mx-1'
                                onClick={() => this.search(this.state.pagination.page + 1 )}>
                                <i className='fas fa-chevron-right'></i>
                            </button>
                            :''
                        }
                        
                    </div>
                </div> 
                {this.resultsHTML()}
            </div>
        )
    }
}
export default Discogs