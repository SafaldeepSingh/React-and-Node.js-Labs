import React from 'react'

class SelectList extends React.Component {
    render () {
        if (!this.props.array) {
            return <p>Error in SelectList Component: Array Not Passed</p>
        }
        if (!this.props.name) {
            return <p>Error in SelectList Component: Name Not Passed</p>
        }
        const listItems = this.props.array.map((element, index) => {
            return <option key={index} value={element.code}>{element.name}</option>
        })
        return (<div>
            <h4>{this.props.heading}</h4>
            <select name={this.props.name}>{listItems}</select>
        </div>)
    }
}
export default SelectList
