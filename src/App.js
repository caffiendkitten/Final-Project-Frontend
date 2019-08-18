import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header'
import SignUp from '../src/containers/SignUp'
import Login from '../src/containers/Login'
import { Container,  Col } from 'react-bootstrap';
import AddToAccount from './containers/AddToAccount'

const userURL = "http://localhost:3000/api/v1/login"
const signupURL = "http://localhost:3000/api/v1/users"
const accountURL = "http://localhost:3000/api/v1/accounts"
const loginURL = "http://localhost:3000/api/v1/logins"



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
      .catch(error => console.error('Error:', error));
  }



  signup = (userObj) =>{
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
    .catch(error => console.error('Error:', error));
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

  // createUser = () {
  //   // testing post to create new user
  //   fetch(userURL, {
  //     method: 'POST', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: 'David1234',
  //         password: '12345'
  //       }
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({
  //       token: localStorage.setItem('token', json.jwt),
  //       user: localStorage.setItem('user', json.user_id)
  //     })
  //   })
  // }

    
    // fetch(userURL, {
    //   method: 'GET',
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    



  // fetchUsers = () => {
  //   fetch(userURL, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(json => this.setState({token: localStorage.setItem('token', json.jwt)}))
  // }

  // componentShouldUpdate() {
  //   if (localStorage.getItem('token')) {
  //     // do fetch for user accounts to list
      
  //   }
  // }

  createAccount = (accountObj) =>{
    // console.log(accountObj, this.state.user_id)
    // console.log("hit", accountObj.account_name)
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
    console.log("hit", deleteAccountObj)
    console.log(this.state.accounts)
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
    console.log("app here:", addToAccountObj, username, password);
    // this.setState({
    //       accounts: [...this.state.accounts, addToAccountObj]
    //     })

    // this.setState({
    //   accounts: [this.state.accounts, ...addToAccountObj.logins: {username: username, password: password, account_id: addToAccountObj.id}]
    // })

    console.log(addToAccountObj.logins)

    // this.setState({
    
    //     addToAccountObj.logins: [...{username: username,
    //       saved_password: password, account_id: addToAccountObj.id}]
    // })

    // this.setState({
    // accounts: [addToAccountObj.logins, [...addToAccountObj.logins, {username: username, saved_password: password, account_id: addToAccountObj.id}]]
    // })


    // this.setState({
      
    //   accounts:  [...addToAccountObj.logins, 
    //   {username: username,
    //   saved_password: password}
    //   ]
    // })
    // debugger;
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
          />
        </div>
      :<div align="center">
        {/* <Header2 handleLogin={this.login}  /> */}
        <h1>Welcome to the Password Manager</h1>
        <hr></hr>
        <Container>
          {/* <Row > */}
            <Col className="login"><Login handleLogin={this.login} /></Col>
            <Col className="signup"><SignUp handleSignUp={this.signup} /></Col>
          {/* </Row> */}
          {/* <button onClick={this.fetchUsers}>Click me</button> */}
        </Container>
      </div>
      }
    </Fragment>
  }
}

export default App;
