import React from 'react'

class Footer extends React.Component {
    render () {
        if (!this.props.authorName) {
            return <p>Error in Footer Component: Author Name not Passes</p>
        }
        return (<p>Author:- {this.props.authorName}</p>)
    }
}

export default Footer
