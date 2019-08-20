import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header'
import SignUp from '../src/containers/SignUp'
import Login from '../src/containers/Login'
import { Container,  Col } from 'react-bootstrap';
// import AddToAccount from './containers/AddToAccount'

const userURL = "http://localhost:3000/api/v1/login"
const signupURL = "http://localhost:3000/api/v1/users"
const accountURL = "http://localhost:3000/api/v1/accounts"
const loginURL = "http://localhost:3000/api/v1/logins"


const Cryptr = require('cryptr');
const cryptr = new Cryptr('Akeytobemoved');
// console.log("token at app:", sessionStorage.getItem('token'))

class App extends Component {

  state = {
    token: '',
    user: '',
    user_id: '',
    password: "",
    email: '',
    accounts: [],
    username: ""
  }
  componentDidMount = () => {
    sessionStorage.clear()
    localStorage.clear()
    this.forceUpdate()
  }


  login = userObj => {
    fetch(userURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userObj)
    })
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem('token', json.jwt)
        // debugger;
        this.setState({
          token: json.jwt,
          user: json.user.username,
          user_id: json.user.id,
          // password: json.user.password,
          email: json.user.email,
          accounts: json.user.accounts
        })
      })
      .catch(error => alert("Unknown username or password."))

  }



  signup = (userObj) =>{
    // debugger;

    // console


    fetch(signupURL, {
      method: 'POST', 
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userObj.username,
          password: userObj.password,
          email: userObj.email
        }
      })
    })
    .then(res => res.json())
    .then(json => {
      // debugger;
      sessionStorage.setItem('token', json.jwt)
      // sessionStorage.setItem('user', json.user.username)
      // console.log("user object in login fetch: ", json.user.username)
      // console.log("user accounts in login fetch: ", json.error)
      this.setState({
        token: json.jwt,
        user: json.user.username,
        password: json.user.password,
        email: json.user.email,
      })
    })
    .catch(error => alert("Error signing up. Username is already taken. Please choose another."));
  }


  logout = () => {
    this.setState({
      user: {},
      token: null,
      accounts: []
    })
    localStorage.clear()
    sessionStorage.clear()
  }


  createAccount = (accountObj) =>{
    this.setState({
      accounts: [...this.state.accounts, accountObj]
    })
    // debugger;
    fetch(accountURL, {
      method: 'POST', 
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        account: {
          account_name: accountObj.account_name,
          user_id: this.state.user_id
        }
      })
    })
    // .then(res => res.json())
    // .then(json => {
    //   // debugger;
    //   // sessionStorage.setItem('token', json.jwt)
    //   // sessionStorage.setItem('user', json.user.username)
    //   // console.log("user object in login fetch: ", json.user.username)
    //   // console.log("user accounts in login fetch: ", json.error)
    //   console.log(json)
    //   this.setState({
    //     accounts: [...this.state.accounts, accountObj]
    //   })
    // })
    .catch(error => console.error('Error:', error));

  }

  deleteAccount = (deleteAccountObj) =>{
    // console.log(accountObj, this.state.user_id)
    // console.log("hit", deleteAccountObj)
    // console.log(this.state.accounts)
    const newAccounts = this.state.accounts.filter(account => {
      return deleteAccountObj.id !== account.id
    })
    this.setState({
        accounts: newAccounts
    })
    // // debugger;
    fetch(`${accountURL}/${deleteAccountObj.id}`, {
      method: 'DELETE', 
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      // body: JSON.stringify({
      //   account: {
      //     account_name: deleteAccountObj.account_name,
      //     user_id: deleteAccountObj.user_id
      //   }
      // })
    })
    // .then(res => res.json())
    // .then(json => {
    //   // debugger;
    //   // sessionStorage.setItem('token', json.jwt)
    //   // sessionStorage.setItem('user', json.user.username)
    //   // console.log("user object in login fetch: ", json.user.username)
    //   // console.log("user accounts in login fetch: ", json.error)
    //   console.log(json)
    //   this.setState({
    //     accounts: [...this.state.accounts, accountObj]
    //   })
    // })
    .catch(error => console.error('Error:', error));

  }

  addToAccount = (addToAccountObj, username, password) =>{
    addToAccountObj.username = username;
    addToAccountObj.saved_password = password;
    // console.log("add cred to app here:", addToAccountObj, username, password);

    // const Cryptr = require('cryptr');
    // const cryptr = new Cryptr('myTotalySecretKey');
    const encryptedString = cryptr.encrypt(password);
    console.log(encryptedString); 
    const decryptedString = cryptr.decrypt(encryptedString);
    console.log(decryptedString); 

    // debugger


    const updatedAccounts = this.state.accounts.map((i) => {
      if (i.account_name === addToAccountObj.account_name) {
        i.logins = [...i.logins, {username: username, saved_password: password, account_id: i.id}]
      } 
      return i
    })
    this.setState({
      accounts: updatedAccounts
    })



    // console.log(addToAccountObj.logins)


    fetch(loginURL, {
      method: 'POST', 
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        
        login: {
          username: username,
          password_digest: password,
          account_id: addToAccountObj.id
        }
      })
    })
    // .then(res => res.json())
    // .then(json => {
    //   sessionStorage.setItem('token', json.jwt)
    //   // this.setState({
    //   //   // token: json.jwt,
    //   //   // user: json.user.username,
    //   //   // user_id: json.user.id,
    //   //   // password: json.user.password,
    //   //   // email: json.user.email,
    //   //   accounts: json.user.accounts
    //   // })
    // })
    .catch(error => console.error('Error:', error));




    
  }



  deleteFromAccount = (deleteFromAccountObj) =>{

    // console.log("add cred to app here:", deleteFromAccountObj);

    const updatedAccounts = this.state.accounts.map((i) => {
      if (i.id === deleteFromAccountObj.account_id) {
        i.logins = i.logins.filter((login) => {
          return deleteFromAccountObj.id !== login.id
        })
      } 
      return i
    })
    
    this.setState({
      accounts: updatedAccounts
    })

// console.log(updatedAccounts)

    // debugger;
    fetch(`${loginURL}/${deleteFromAccountObj.id}`, {
      method: 'DELETE', 
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      // body: JSON.stringify({
        
      //   login: {
      //     username: username,
      //     password_digest: password,
      //     account_id: addToAccountObj.id
      //   }
      // })
    })
    // .then(res => res.json())
    // .then(json => {
    //   sessionStorage.setItem('token', json.jwt)
    //   // this.setState({
    //   //   // token: json.jwt,
    //   //   // user: json.user.username,
    //   //   // user_id: json.user.id,
    //   //   // password: json.user.password,
    //   //   // email: json.user.email,
    //   //   accounts: json.user.accounts
    //   // })
    // })
    .catch(error => console.error('Error:', error));




    
  }


  render () {
    return <Fragment>

      {sessionStorage.getItem('token') ? 
        <div className="App">
          <Header 
          user={this.state.user} 
          email={this.state.email} 
          username={this.state.username}
          password={this.state.password}
          accounts={this.state.accounts}
          handleLogout={this.logout} 
          createAccount={this.createAccount}
          deleteAccount={this.deleteAccount}   
          addToAccount={this.addToAccount}     
          deleteFromAccount={this.deleteFromAccount}   
          />
        </div>
      :<div align="center">
        <h1>Welcome to the Password Manager</h1>
        <hr></hr>
        <p>
          With billions of login credentials being breached at any time it becomes more and more important to secure our data. <br></br>
          The first step to security is a password manager as this will allow people to create strong and unique passwords.<br></br>
          By creating strong and unique passwords this will help keep user credentials secure even if they are part of a data breach.
        </p>
        <Container>
            <Col className="login"><Login handleLogin={this.login} /></Col>
            <Col className="signup"><SignUp handleSignUp={this.signup} /></Col>
        </Container>
      </div>
      }

    </Fragment>
  }
}

export default App;
