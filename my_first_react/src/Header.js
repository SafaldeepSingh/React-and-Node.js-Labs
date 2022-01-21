import React from 'react'

class Header extends React.Component {
    render () {
        if (!this.props.companyName) {
            return <p>Error in Header Component: Company Name not Passed</p>
        }
        return (<h1>{this.props.companyName}</h1>)
    }
}

export default Header
