import React from 'react';
import AccountList from "../components/AccountList"
// import EditAccountCreds from "../containers/EditAccountCreds"
// import { Container } from 'react-bootstrap';
// import Search from './Search'


class Home extends React.Component {
  state ={
    account_name: '',
    username: "",
    password: "",
    logins: [],
    filteredBy: "",
    displayAccounts: []
}

onAddAccount = (event) => {
    event.preventDefault()
    if (this.state.account_name !== ""){
      // console.log("not empty")
      this.props.createAccount(this.state)
    } else {
      // console.log("empty")
      alert("Please Enter an Account Name")
    }

}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

deleteAccount = (acct) => {
  // console.log(acct)
  this.props.deleteAccount(acct)
}

addToAccount = (acctObj) => {

  // console.log("home level:", acctObj, this.state.username, this.state.password)
  if (this.state.username !== '' || this.state.password !== ''){
    this.props.addToAccount(acctObj, this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }else {
    alert("need username and password")
  }
  // <AddToAccount acctObj={acctObj} />
}

handleFilter = (filteredBy) => {
  // console.log("hit in Home", this.state.filteredBy)
  this.props.filterAccounts(this.state.filteredBy)
}

displayAccounts = () => {
  let accountsToDisplay = this.props.filteredAccounts.length === 0 ? this.props.accounts : this.props.filteredAccounts;
  // console.log(accountsToDisplay)
  return accountsToDisplay.map((account, idx) => {
    return <li key={idx} className="account-list" >
        <span className="account-name"><h1>{account.account_name}</h1></span>
        {account.logins && account.logins.length > 0 ?
          <React.Fragment>
          {/* <span id="button_floater">
            <button onClick={() => <AddToAccount account={account} />}>
            Add Credentials to Account
            </button>

          </span>  */}
          <ul className="account-list">
              {account.logins.map((login, idx) =>{
                return <AccountList 
                            deleteFromAccount={this.props.deleteFromAccount} 
                            logins={login} 
                            key={idx}
                            account={account}
                            />
              })
            }
          </ul>
          {/* <EditAccountCreds account={account} username={this.state.username} password={this.state.password}/> */}
          <ul>
            <li>
              <input
              type="text" 
              placeholder="Username" 
              name="username"
              onChange={this.handleChange}
            />
            <input
              type="text" 
              placeholder="Password" 
              name="password"
              onChange={this.handleChange}
            />
            <button onClick={() => this.addToAccount(account, this.state.username, this.state.password)}>Add</button>
            </li>
          </ul>
          </React.Fragment>
        :  
          <React.Fragment>
            <span id="button_floater">
              <button onClick={() => this.deleteAccount(account)} >
                  Delete Account Info
              </button>
            </span> 
            <ul>
            <li>
              <input
              type="text" 
              placeholder="Username " 
              name="username"
              onChange={this.handleChange}
            />
            <input
              type="text" 
              placeholder="Password " 
              name="password"
              onChange={this.handleChange}
            />
            <button onClick={() => this.addToAccount(account)}>Add</button>
            </li>
          </ul>
            
          </React.Fragment>


          
        }
      <hr></hr>
      </li>

  }

  )
}  


  render () {
    return (<div className="navbar" align="center">
      <h3>Welcome back {this.props.user}</h3>
      {/* <Container> */}
      <div className="account-list">



        <input
          type="text" 
          placeholder="Search Account Groups" 
          name="filteredBy"
          onChange={this.handleChange}
        />
        <button onClick={this.handleFilter}>Search</button>
        {/* <button>Show All</button> */}
        {/* <Search onChange={this.handleChange} handleFilter={this.handleFilter} /> */}



        <br></br>
        <input
          type="text" 
          placeholder="Add Account Group" 
          name="account_name"
          onChange={this.handleChange}
        />
        <button onClick={this.onAddAccount}>Add</button>






        <p>Your current Account groups are:</p>
        
          <ul className="account-list">
            {this.displayAccounts()}
          </ul>


      </div>
      {/* </Container> */}
    </div>
    );
  }
}

export default Home;
