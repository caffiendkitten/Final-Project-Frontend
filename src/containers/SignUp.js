import React from 'react'
import { Form } from 'react-bootstrap';


// const capitalize = string => {
//     return string.charAt(0).toUpperCase() + string.slice(1)
// }



class Signup extends React.Component {
    state ={
        username: "",
        password: "",
        email: ""
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log("signup state", this.state)
        this.props.handleSignUp(this.state)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return <div>
            <h2>Signup</h2>
            <Form  onSubmit={this.onSubmit}>
                <Form.Group >
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text" 
                        required={true} 
                        placeholder="Enter username" 
                        name="username"
                        onChange={this.handleChange}
                        />
                        <br></br>

                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="text" 
                        required={true} 
                        placeholder="Enter password" 
                        name="password"
                        onChange={this.handleChange}
                        />
                        <br></br>
                    
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        id="email-field"
                        required={true} 
                        placeholder="Enter email" 
                        name="email"
                        onChange={this.handleChange}
                        title="Please provide a valid email address."
                        />
                        <br></br>
                    
                    <button type="submit">Signup</button>
                </Form.Group>
            </Form>
        </div>   
    }    
}
        
export default Signup