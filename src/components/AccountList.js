import React from 'react';

class AccountList extends React.Component {

  render () {
// console.log(this.props.logins.id)
    return <li key={this.props.logins.id} className="account-list-li">Username: {this.props.logins.username}, Password: {this.props.logins.saved_password}
            <span id="button_floater">
                <button >
                Update
                </button>
                <button >
                Delete
                </button>
            </span> 
        </li>
  }
}

export default AccountList;
