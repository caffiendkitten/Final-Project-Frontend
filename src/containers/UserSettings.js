import React from 'react'
// import { Container } from 'react-bootstrap';


class UserSettings extends React.Component {
    state = {
        updateUser: '',
        updateEmail: '',
        error: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    editUser = () => {
        if (this.state.updateUser.length > 8 || this.state.updateUser.length === ''){
            console.log("hit user", this.state.updateUser)
        }else {
            this.setState({
                error: "Username is too short. Must be more than 6 characters long"
            })
            alert(this.state.error)
        }
    }


    editEmail = () => {
        console.log("new:", this.state.updateEmail)
        console.log("old:", this.props.email)
        if(this.state.updateEmail != this.props.email){
            console.log("newemail is,", this.state.updateEmail)
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
                this.props.handleSignUp(this.state)
            }else {
            this.setState({
                error: "You have entered an invalid email address. <br/> Can only contain letter, '@', and '.'."
            })
            alert(this.state.error)
            }
        }

        console.log("hit email", this.state.updateEmail)
    }

    render () {



        return <div  className="navbar" >
            <h3>User Settings for {this.props.user}</h3>
            <p>{this.props.user}</p>
            {/* <input 
                placeholder={this.props.user} 
                onChange={this.handleChange}
                name="updateUser" 
                type="text"
                />
            <button onClick={this.editUser}>Update Username</button> */}
        <br></br>
            <input 
                placeholder={this.props.email} 
                onChange={this.handleChange} 
                name="updateEmail" 
                type="email"
                id="email-field"
                />
            <button onClick={this.editEmail}>Edit Email Address</button>
            
            
        </div>       
    }
}
            
export default UserSettings