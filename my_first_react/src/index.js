import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import SelectList from './SelectList'
import reportWebVitals from './reportWebVitals'
const provinces = [{ code: 'QC', name: 'Quebec' }, { code: 'ON', name: 'Ontario' }, { code: 'NB', name: 'New-Brunswick' }]

const countries = [{ code: 'CA', name: 'Canada' }, { code: 'US', name: 'USA' }, { code: 'IN', name: 'India' }, { code: 'MX', name: 'Mexixo' }]

class Header extends React.Component {
    render () {
        return (<p>This is the Header component</p>)
    }
}
class Footer extends React.Component {
    render () {
        return (<p>This is the Footer component</p>)
    }
}
class Page extends React.Component {
    render () {
        return (
            <div>
                <Header companyName="blabla.com"/>
                <p>Hello World !</p>
                <SelectList heading="Provinces" array={provinces}/>
                <SelectList heading="Countries" array={countries}/>
                <Footer authorName="Stéphane Lapointe"/>
            </div>
        )
    }
}
ReactDOM.render(<Page/>, document.getElementById('root'))

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
