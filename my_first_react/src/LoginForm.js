import React from 'react'

class LoginForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: this.props.username,
            password: this.props.password
        }
    }

    handleFormFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render () {
        return (
            <form style={{ border: '1px solid black', background: 'blue' }}>
                <div className='form-group'>
                    <label htmlFor='username'>UserName</label>
                    <input name='username' id='username' value={this.state.username}
                        onChange={(event) => this.handleFormFieldChange(event)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input name='password' id='password' value={this.state.password}
                        onChange={(event) => this.handleFormFieldChange(event)}/>
                </div>
                <button type='button' onClick={() => this.formSubmit()}>Login</button>
            </form>
        )
    }
}

export default LoginForm
