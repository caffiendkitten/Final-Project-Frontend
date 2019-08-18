import React, { Component } from 'react';
import Home from '../containers/Home'
import GeneratePassword from '../containers/GeneratePassword'
import CheckPassword from '../containers/CheckPassword'
import UserSettings from '../containers/UserSettings'
// import SignUp from '../containers/SignUp'
import About from './AboutUs'
// import Login from '../containers/Login'


import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import { Redirect } from 'react-router'



class Header extends Component {

    handleLogout = () => {
        this.props.handleLogout(this.state)
        // handleLogout
    }



    render(){
        return <div className='header'>
            <Router>

                <ul>
                    <li><NavLink to="/" exact >Home</NavLink></li>
                    <li className="dropdown">
                        <span className="dropbtn">More</span>
                        <div className="dropdown-content">
                            <NavLink to="/generate" exact >Generate Password</NavLink>
                            <NavLink to="/checkpassword" exact >Check Existing Password</NavLink>
                            <NavLink to="/usersettings" exact >User Settings</NavLink>
                            <NavLink to="/about" exact >About Us</NavLink>
                        </div>
                    </li>
                    <li className='last'><NavLink to="/" onClick={this.handleLogout}>Logout</NavLink></li>
                </ul>

                <Route path ="/generate" exact render={props => <GeneratePassword  />} ></Route>
                <Route path ="/checkpassword" exact render={props => <CheckPassword  />} ></Route>
                <Route path ="/usersettings" exact render={props => <UserSettings  
                                                            user={this.props.user} 
                                                            email={this.props.email}  
                                                            />} ></Route>
                <Route path ="/about" exact render={props => <About  />} ></Route>
                <Route path ="/" exact render={props => <Home 
                                                            username={this.props.username}
                                                            password={this.props.password}
                                                            addToAccount={this.props.addToAccount}
                                                            deleteFromAccount={this.props.deleteFromAccount}
                                                            createAccount={this.props.createAccount} 
                                                            deleteAccount={this.props.deleteAccount} 
                                                            user={this.props.user} 
                                                            accounts={this.props.accounts} 
                                                            />} ></Route>
                {/* <Route path ="/" exact render={props => <Login  />} ></Route> */}
            </Router>
            </div>
            
    }     
}
        
export default Header