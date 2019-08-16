import React from 'react'
import { Form } from 'react-bootstrap';


// const capitalize = string => {
//     return string.charAt(0).toUpperCase() + string.slice(1)
// }
class Login extends React.Component {
    state ={
        username: "",
        password: ""
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.handleLogin(this.state)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render (){
    return <div>
        <h2>Login:</h2>
        <Form onSubmit={this.onSubmit} >
            <Form.Group >
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    required={true} 
                    placeholder="Enter username" 
                    status={this.props.status} 
                    name="username"
                    onChange={this.handleChange}
                />
                <br></br>

                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="text" 
                    required={true} 
                    placeholder="Enter password" 
                    status={this.props.status} 
                    name="password"
                    onChange={this.handleChange}
                />
                <br></br>

                <button type="submit">Login</button>

            </Form.Group>

        </Form>
    </div>       
    }
}
        
export default Login