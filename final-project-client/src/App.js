import React from 'react'
import Discogs from './Discogs';
import Header from './Header';
import Playlist from './Playlist';


class App extends React.Component{
  render(){
    return (
      <div className='container-fluid'>
        <div className='row'> 
            <Header/>
          <div className='col-6 section'> 
            <Playlist />
          </div>
          <div className='col-6 section'> 
            <Discogs />
          </div>
        </div>
      </div>

    )
  }
}
export default App;
