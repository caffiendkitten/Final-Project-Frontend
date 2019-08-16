import React from 'react'
import { Container } from 'react-bootstrap';


class UserSettings extends React.Component {
    editUser = () => {
        console.log("hit user")
    }


    editEmail = () => {
        console.log("hit email")
    }

    render () {



        return <Container>
            <h3>User Settings for {this.props.user}</h3>

            <p>{this.props.user} <button onClick={this.editUser}>Edit Username</button></p>
            <p>{this.props.email} <button onClick={this.editEmail}>Edit Email Address</button></p>
            
            
        </Container>       
    }
}
            
export default UserSettings