import React from 'react'
import { Form } from 'react-bootstrap';
import HIBPPasswordChecker from "react-have-i-been-pwned";


class Signup extends React.Component {
    state ={
        username: "",
        password: "",
        email: "",
        error: ''
    }

    onSubmit = (event) => {
        event.preventDefault()
        // console.log("signup state", this.state)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
                this.props.handleSignUp(this.state)
        }else {
            this.setState({
                error: "You have entered an invalid email address. Can only contain letter, '@', and '.'."
            })
            alert(this.state.error)
        }



       
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        const { password } = this.state;

        return <div   className="password-check">
            <h2>Signup</h2>
            <Form  onSubmit={this.onSubmit}>
                <Form.Group >
                    <Form.Label>Username (6-20 chars):</Form.Label>
                    <Form.Control 
                        type="text" 
                        required={true} 
                        placeholder="Enter username" 
                        name="username"
                        onChange={this.handleChange}
                        />
                        <br></br>

                    <Form.Label>Password (8-20 chars):</Form.Label>
                    <Form.Control 
                        type="text" 
                        required={true} 
                        placeholder="Enter password" 
                        name="password"
                        value={password}
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

            <div className="checker">
            <HIBPPasswordChecker password={password}>
              {({ initial, loading, error, pwned, count }) => {
                if (initial) return null;
                if (loading) return "Checking the security of this password...";
                if (error) return `error: ${error}`;
                if (!pwned)
                  return (
                    <>
                      This password is safe to use and appeared in no known data
                      breaches.{" "}
                    </>
                  );
                if (pwned)
                  return (
                    <>
                      <strong>This password isn't safe to use</strong> and
                      appeared in {count.toLocaleString()} known data breaches.
                      You can still use it, but you probably shouldn't...{" "}
                    </>
                  );
              }}
            </HIBPPasswordChecker>
          </div>
        </div>   
    }    
}
        
export default Signup