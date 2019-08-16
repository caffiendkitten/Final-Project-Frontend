import React from 'react';

class AccountList extends React.Component {


  render () {
    return (
        <div>
        {/* {console.log(this.props.logins.username)} */}
        <li className="account-list-li">Username: {this.props.logins.username}, Password: {this.props.logins.saved_password}
            <span id="button_floater">
                <button >
                Update
                </button>
                <button >
                Delete
                </button>
            </span> 
        </li>

      </div>
    );
  }
}

export default AccountList;
