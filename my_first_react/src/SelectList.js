import React from 'react'

class SelectList extends React.Component {
    render () {
        const listItems = this.props.array.map((element, index) => {
            return <li key={index}>{element.code}: {element.name}</li>
        })
        return (<div>
            <h4>{this.props.heading}</h4>
            <ul>{listItems}</ul>
        </div>)
    }
}
export default SelectList
