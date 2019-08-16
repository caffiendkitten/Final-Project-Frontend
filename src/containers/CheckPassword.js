import React from 'react'




class CheckPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          minlength: 8,
          pwpasswordd: "",
        }
    }
    handleChange(e) {
        const { name, checked } = e.target;
        this.setState({
          [name]: checked
        });
        // this.generatePwd();
    }

    handleClick = () => {
        console.log("hit")
    }

    render(){
        return <div>
            <h2>Type in current password to see if its been found on HaveIBeenPwned.</h2>
            <div className="form-group">
                    <label className="checkbox-container">
                      
                      <input
                        type="text"
                        name="passwordCheck"
                        onChange={e => this.handleChange(e)}
                      />
                      <span className="checkmark" />
                    </label><br></br>

                    <button
                    className="btn  btn-primary"
                    onClick={() => {
                      this.handleClick();
                    }}
                  >
                    Generate
                  </button>
            </div>
            
            
        </div>   
    }    
}
        
export default CheckPassword