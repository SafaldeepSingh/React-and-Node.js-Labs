import React from 'react'

class Office extends React.Component{
    render() {
        return (
            <table>
            <tbody>
            <tr><th>Office Code</th><td>{this.props.office.officecode}</td></tr>
            <tr><th>Address Line 1</th><td>{this.props.office.addressline1}</td></tr>
            <tr><th>Address Line 2</th><td>{this.props.office.addressline2}</td></tr>
            <tr><th>City</th><td>{this.props.office.city}</td></tr>
            <tr><th>State</th><td>{this.props.office.state}</td></tr>
            <tr><th>Postal Code</th><td>{this.props.office.postalcode}</td></tr>
            </tbody>
            </table>

        )
    }
}
export default Office