import React from 'react'
import './Header.css'

class Header extends React.Component{
    render(){
        return (
            <div className='header col-12'>
                <span>
                    <img src='logo512.png' alt='logo'/>
                </span>
                <h1>Welcome - Music Playlist Manager</h1>
            </div>
        )
    }
}
export default Header;