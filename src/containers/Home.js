import React from 'react';
import AccountList from "../components/AccountList"
import AddToAccount from "../containers/AddToAccount"
// import { Container } from 'react-bootstrap';


class Home extends React.Component {
  state ={
    account_name: [],
    username: "",
    password: ""
    // user_id: ""
}

onAddAccount = (event) => {
    event.preventDefault()
    this.props.createAccount(this.state)
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

addToAccount = (acctObj, username, password) => {

  // console.log("home level:", acctObj, this.state.username, this.state.password)
  this.props.addToAccount(acctObj, this.state.username, this.state.password)
  // <AddToAccount acctObj={acctObj} />
}


  render () {
    return (<div align="center">
      <h3>Welcome back {this.props.user}</h3>
      {/* <Container> */}
      <div className="account-list">

        <input
          type="text" 
          placeholder="Search Account Groups" 
        />
        <button>Search</button>
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
            {this.props.accounts.map((account, idx) => {
              return <li key={idx} className="account-list" >
                  <span>{account.account_name}</span>
                  {account.logins && account.logins.length > 0 ?
                    <React.Fragment>
                    {/* <span id="button_floater">
                      <button onClick={() => <AddToAccount account={account} />}>
                      Add Credentials to Account
                      </button>

                    </span>  */}
                    <ul className="account-list">
                        {account.logins.map((login, idx) =>{
                          return <AccountList logins={login} idx={idx}/>
                        })
                      }
                    </ul>
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
          </ul>


      </div>
      {/* </Container> */}
    </div>
    );
  }
}

export default Home;