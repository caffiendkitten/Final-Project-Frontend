import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header'
import SignUp from '../src/containers/SignUp'
import Login from '../src/containers/Login'
import Auths from '../src/containers/Auth'
import { Container,  Col } from 'react-bootstrap';

// import AddToAccount from './containers/AddToAccount'
// import Search from './containers/Search'

// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from './aws-exports.js';
// // import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// Amplify.configure(awsconfig);

const Cryptr = require('cryptr');
// const key = ''
export const cryptr = new Cryptr(process.env.REACT_APP_CRYPT_KEY);
// console.log("token at app:", sessionStorage.getItem('token'))

class App extends Component {

  state = {
    token: '',
    user: '',
    user_id: '',
    password: "",
    email: '',
    accounts: [],
    username: "",
    filteredAccounts: []
  }
  componentDidMount = () => {
    sessionStorage.clear()
    localStorage.clear()
    this.forceUpdate()
  }



// ***** Log into application *****
  login = userObj => {
    fetch(process.env.REACT_APP_userURL, {
        method: 'POST',
        headers: {
	  'Content-Type':'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userObj)
    })
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem('token', json.jwt)
        this.setState({
          token: json.jwt,
          user: json.user.username,
          user_id: json.user.id,
          // password: json.user.password,
          email: json.user.email,
          accounts: json.user.accounts
        })
      })
      .catch(error => alert("Unknown username or password.", error))
  }


// ***** Sign User up for account *****
  signup = (userObj) =>{
    fetch(process.env.REACT_APP_signupURL, {
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
      sessionStorage.setItem('token', json.jwt)
      // sessionStorage.setItem('user', json.user.username)
      this.setState({
        token: json.jwt,
        user: json.user.username,
        password: json.user.password,
        email: json.user.email,
      })
    })
    .catch(error => alert("Error signing up. Username is already taken. Please choose another.", error));
  }




// ***** Log user out of session *****
  logout = () => {
    this.setState({
      user: {},
      token: null,
      accounts: []
    })
    localStorage.clear()
    sessionStorage.clear()
  }





// ***** Create Credential Account Grouping *****
  createAccount = (accountObj) =>{
    console.log(accountObj)
    // this.setState({
    //   accounts: [...this.state.accounts, accountObj]
    // })
    // debugger;
    fetch(process.env.REACT_APP_accountURL, {
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
    .then(res => res.json())
    .then(json => {

      // sessionStorage.setItem('token', json.jwt)
      // sessionStorage.setItem('user', json.user.username)
      // console.log("user object in login fetch: ", json.user.username)
      // console.log("user accounts in login fetch: ", json.error)
      // console.log("acccount has been made:", json)
      let acct = json
      acct.logins = []
      // console.log("setting logins:", json)
      // debugger
      this.setState({
        accounts: [...this.state.accounts, acct]
      })

    })
    .catch(error => console.log("error: ", error)); //alert("Error adding new Account Grouping. Please try again."));
//  debugger;
  }





// ***** Delete Credential Account Grouping if empty *****
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
    fetch(`${process.env.REACT_APP_accountURL}/${deleteAccountObj.id}`, {
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
    .catch(error => console.error('Error:', console.log("error at deleteAccounr", error)));

  }







// ***** Add Cred to account grouping *****
  addToAccount = (addToAccountObj, username, password) =>{
    addToAccountObj.username = username;
    addToAccountObj.saved_password = password;
    // console.log("add cred to app here:", addToAccountObj, username, password);

    // const Cryptr = require('cryptr');
    // const cryptr = new Cryptr('myTotalySecretKey');
    const encryptedString = cryptr.encrypt(password);
    console.log("encrypted on send", encryptedString);
    // const decryptedString = cryptr.decrypt(encryptedString);
    // console.log(decryptedString);
    const updatedAccounts = this.state.accounts.map((i) => {
      if (i.account_name === addToAccountObj.account_name) {
        i.logins = [...i.logins, {username: username, saved_password: encryptedString, account_id: i.id}]
      }
      return i
    })
    // this.setState({
    //   accounts: updatedAccounts
    // })
	// debugger

    // console.log(addToAccountObj)
    fetch(process.env.REACT_APP_loginURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',    
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        login: {
          username: username,
          password_digest: encryptedString,
          account_id: addToAccountObj.id
        }
      })
    })
    .then(res => res.json())
    .then(json => {
      // sessionStorage.setItem('token', json.jwt)
      // this.setState({
      //   // token: json.jwt,
      //   // user: json.user.username,
      //   // user_id: json.user.id,
      //   // password: json.user.password,
      //   // email: json.user.email,
      //   accounts: json.user.accounts
      // })
      // console.log("creds added",json)
      // const updatedAccounts = this.state.accounts.map((i) => {
      //   if (i.account_name === addToAccountObj.account_name) {
      //     i.logins = [...i.logins, {username: username, saved_password: encryptedString, account_id: addToAccountObj.id}]
      //   }
      //   return i
      // })
      this.setState({
        accounts: updatedAccounts
      })
    })
    .catch(error =>  alert("Error adding new credentials to account grouping. Please refresh and try again."));


    // const updatedAccounts = this.state.accounts.map((i) => {
    //   if (i.account_name === addToAccountObj.account_name) {
    //     i.logins = [...i.logins, {username: username, saved_password: encryptedString, account_id: i.id}]
    //   }
    //   return i
    // })


  }



// ***** Delete Credential from Account Grouping
  deleteFromAccount = (deleteFromAccountObj) =>{
    const updatedAccounts = this.state.accounts.map((i) => {
      if (i.id === deleteFromAccountObj.account_id) {
        i.logins = i.logins.filter((login) => {
          return deleteFromAccountObj.id !== login.id
        })
      }
      return i
    })
    // debugger;

    fetch(`${process.env.REACT_APP_loginURL}/${deleteFromAccountObj.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',    
        'Accept': 'application/json'
      } //,
//       body: JSON.stringify({

    //     login: {
   //        username: deleteFromAccountObj.username,
  //         password_digest: deleteFromAccountObj.saved_password,
 //          account_id: deleteFromAccountObj.id
  //       }
 //      })
    })
    .then(res => res.json())
    .then(json => {
    //   sessionStorage.setItem('token', json.jwt)
    //   // this.setState({
    //   //   // token: json.jwt,
    //   //   // user: json.user.username,
    //   //   // user_id: json.user.id,
    //   //   // password: json.user.password,
    //   //   // email: json.user.email,
    //   //   accounts: json.user.accounts
	this.setState({
		accounts: updatedAccounts
	})
    })
    .catch(error => console.error('An error happened when attempting to delete the credential. please try again'));
  }





// ***** Search Account Groupings *****
  filterAccounts = (filteredBy) => {
    console.log("Word to filter By:", filteredBy)
    let newAccount = this.state.accounts.filter(term => {
      return term.account_name.toUpperCase().includes(filteredBy.toUpperCase())
    })


    // console.log("new account that is filtered:", newAccount)
    if(!filteredBy){ //  || newAccount[0].logins.length === 0 || newAccount[0] === []
      this.setState({
        filteredAccounts: []
      }) //, () => alert("No Account Grouping Exists with This Name. Please Check Spelling."))
      // alert("No Account Grouping Exists with This Name. Please Check Spelling.");
    }else{
      this.setState({
        filteredAccounts: newAccount
      })
    }
    // console.log("new account2 after if/else", newAccount)

    // console.log("the filtered accounts:", this.state.filteredAccounts) //
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
          filterAccounts={this.filterAccounts}
          filteredAccounts = {this.state.filteredAccounts}
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
           {/* <Col className="signup"><Auths /></Col> */}

        </Container>
      </div>
      }

    </Fragment>
  }
}

export default App;
