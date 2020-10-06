import React from 'react';
// import {cryptr} from '../App'
const Cryptr = require('cryptr');

class AccountList extends React.Component {



deleteFromAccount = (deleteFromAccountObj) => {
  // console.log("hit in accountList")
  this.props.deleteFromAccount(deleteFromAccountObj)
}

cryptr = new Cryptr(process.env.REACT_APP_CRYPT_KEY);

// updateCreds = (updateCred) => {
//   console.log("found cred", updateCred)
// }


  render () {
    // console.log("Decrypted on retrieval ", encryptedString); 

// console.log(this.props.account)
// debugger;
    return (
    
    
      <li 
              key={this.props.logins.id} 
              className="account-list-li"
              >
                
                
                {/* {console.log("Decrypted on retrieval ", this.cryptr.decrypt(this.props.logins.saved_password))} */}




                Username: {this.props.logins.username}, Password: {this.cryptr.decrypt(this.props.logins.saved_password)}
              <span id="button_floater">
                  {/* <button onClick={() => this.updateCreds(this.props.logins)}>
                  Update
                  </button> */}
                  <button  onClick={() => this.deleteFromAccount(this.props.logins)}>
                  Delete
                  </button>
              </span> 
          </li>
    )
  }
}

export default AccountList;
