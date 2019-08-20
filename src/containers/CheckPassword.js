import React from 'react'
import HIBPPasswordChecker from "react-have-i-been-pwned";




class CheckPassword extends React.Component {
    constructor() {
        super();
        this.state = {
          // minlength: 8,
          password: ""
        }
    }
    handleChange = ev => {
      this.setState({
        password: ev.target.value
      });
    };

    render() {
      const { password } = this.state;
      return (
        <div className="password-check">
          <h2>
            Start typing to check if your password has been compromised. <a
                        href="https://haveibeenpwned.com/FAQs#DataSource"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Learn more
                      </a>
          </h2>
          <div>
            <input
              type="text"
              onChange={this.handleChange}
              value={password}
              style={{ width: "100%" }}
            />
          </div>
          <div className="checker">
            <HIBPPasswordChecker password={password}>
              {({ initial, loading, error, pwned, count }) => {
                if (initial) return null;
                if (loading) return "Checking the security of this password...";
                if (error) return `error: ${error}`;
                if (!pwned)
                  return (
                    <>
                      This password is safe to use and appeared in no known data
                      breaches.{" "}
                      <a
                        href="https://haveibeenpwned.com/FAQs#DataSource"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Learn more
                      </a>
                      .
                    </>
                  );
                if (pwned)
                  return (
                    <>
                      <strong>This password isn't safe to use</strong> and
                      appeared in {count.toLocaleString()} known data breaches.
                      You can still use it, but you probably shouldn't...{" "}
                    </>
                  );
              }}
            </HIBPPasswordChecker>
          </div>
        </div>
      );
    }
}
        
export default CheckPassword