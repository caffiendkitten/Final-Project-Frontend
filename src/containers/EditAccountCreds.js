import React from 'react'



class EditAccountCreds extends React.Component {
addToAccount = (acctObj, username, password) => {
    // event.persist();

    console.log("edit act cred level:", acctObj, username, password)
    // this.props.addToAccount(acctObj, props.username, props.password)
    // <AddToAccount acctObj={acctObj} />
}
    render(){
        return  <form className="form-row">
            <div className="col-6">

                <input
                    type="text" 
                    className="form-control"
                    placeholder="Username" 
                    name="username"
                    // value={props.formInput.username}
                    // onChange={this.handleChange}
                />


                {/* <input type="text" 
                    className="form-control" 
                    placeholder="username" 
                    value={props.formInput.topping} 
                    name="username" 
                    onChange={props.updateForm}
                /> */}
            {/* </div>
            <div className="col-5"> */}
                <input
                    type="text"
                    className="form-control" 
                    placeholder="Password" 
                    name="password"
                    // value={props.formInput.password}
                    // onChange={this.handleChange}
                    />


                {/* <input type="text" 
                    className="form-control" 
                    placeholder="password" 
                    value={props.formInput.topping} 
                    name="password" 
                    onChange={props.updateForm}
                /> */}
            </div>           
            <div className="col">
                <button type="submit" 
                    className="btn btn-success" 
                    // onClick={props.submitForm} 
                    onClick={() => this.addToAccount(this.props.account, this.props.username, this.props.password)}
                >
                    Add/Update
                </button>
            </div>
        </form>
    // </div>       
    }
}
export default EditAccountCreds