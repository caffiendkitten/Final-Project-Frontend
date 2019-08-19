import React from 'react';

class AccountList extends React.Component {



deleteFromAccount = (deleteFromAccountObj) => {
  // console.log("hit in accountList")
  this.props.deleteFromAccount(deleteFromAccountObj)
}

// updateCreds = (updateCred) => {
//   console.log("found cred", updateCred)
// }


  render () {
// console.log(this.props.account)
    return <li key={this.props.logins.id} className="account-list-li">Username: {this.props.logins.username}, Password: {this.props.logins.saved_password}
            <span id="button_floater">
                {/* <button onClick={() => this.updateCreds(this.props.logins)}>
                Update
                </button> */}
                <button  onClick={() => this.deleteFromAccount(this.props.logins)}>
                Delete
                </button>
            </span> 
        </li>
  }
}

export default AccountList;
