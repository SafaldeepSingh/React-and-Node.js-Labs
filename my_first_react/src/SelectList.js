import React from 'react'

class SelectList extends React.Component {
    render () {
        if (!this.props.array) {
            return <p>Error in SelectList Component: Array Not Passed</p>
        }
        const listItems = this.props.array.map((element, index) => {
            return <li key={index}>{element.code}: {element.name}</li>
        })
        return (<div>
            <h4>{this.props.heading}</h4>
            <ol>{listItems}</ol>
        </div>)
    }
}
export default SelectList
