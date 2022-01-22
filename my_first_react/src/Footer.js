import React from 'react'
import styles from './Footer.module.css'
class Footer extends React.Component {
    render () {
        if (!this.props.authorName) {
            return <p>Error in Footer Component: Author Name not Passes</p>
        }
        return (<p className={styles.p20}>Author:- {this.props.authorName}</p>)
    }
}

export default Footer
