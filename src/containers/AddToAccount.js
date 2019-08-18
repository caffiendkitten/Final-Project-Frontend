import React from 'react';

class AddToAccount extends React.Component {

  render () {
console.log("added to list:",this.props.addToAccountObj)
    return <li className="account-list-li">
        {/* Username: {this.props.logins.username}, 
        Password: {this.props.logins.saved_password} */}
        hit
            <span id="button_floater">
                <button >
                Add
                </button>
            </span> 
        </li>
  }
}

export default AddToAccount;
