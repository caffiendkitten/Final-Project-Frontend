import React, { Component } from "react";
import Clipboard from "../components/Clipboard";
import { RandomPassword } from "../utils/RandomPassword";
// const root = document.documentElement;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 8,
      pwd: "",
      upperCase: true,
      lowerCase: true,
      numeric: true,
      symbol: false
    };
  }

  componentDidMount() {
    this.generatePwd();
  }


  generatePwd() {
    const { upperCase, lowerCase, numeric, symbol, length } = this.state;
    let pwd = new RandomPassword()
      .setLength(length)
      .setLowerCase(lowerCase)
      .setUpperCase(upperCase)
      .setNumberCase(numeric)
      .setSymbol(symbol)
      .generate();
    this.setState({ pwd });
  }

  handleCheckbox(e) {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked
    });
    // this.generatePwd();
  }


  render() {
    return (
      <div>
        <div style={{marginTop: 20}}>
          <section>
            <header>
              <div className="row">
                <div className="col">
                  <h1 className=" terminal-prompt">
                    Generate a secure password
                  </h1>
                
                </div>
              </div>
            </header>

            <div>
              <label >
              <input
              className="input-container"
                id="input"
                name="password"
                type="text"
                readOnly
                value={this.state.pwd}
                min="1"
                max="64"
                
                onChange={ e => this.setLength(e.target) }

              />
              </label>

              <div className="input-container">
                <Clipboard  />
              </div>
            </div>
          </section>
          <hr />

          <section>

            <header>
              <h3>Customize your password</h3>
            </header>

            <fieldset>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="checkbox-container">
                      Uppercase A-Z (default)
                      <input
                        type="checkbox"
                        checked={this.state.upperCase}
                        name="upperCase"
                        onChange={e => this.handleCheckbox(e)}
                      />
                      <span className="checkmark" />
                    </label><br></br>

                    <label className="checkbox-container">
                      Lowercase a-z (default)
                      <input
                        type="checkbox"
                        checked={this.state.lowerCase}
                        name="lowerCase"
                        onChange={e => this.handleCheckbox(e)}
                      />
                      <span className="checkmark" />
                    </label><br></br>

                    <label className="checkbox-container">
                      Numeric 0-9
                      <input
                        type="checkbox"
                        checked={this.state.numeric}
                        name="numeric"
                        onChange={e => this.handleCheckbox(e)}
                      />
                      <span className="checkmark" />
                    </label><br></br>

                    <label className="checkbox-container">
                      Symbols {"!@$%^&*()<>,.?/[]{}-=_+"}
                      <input
                        type="checkbox"
                        checked={this.state.symbol}
                        name="symbol"
                        onChange={e => this.handleCheckbox(e)}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div><br></br>

                <div className="col">
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="email">Password Length:</label>
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          min="8"
                          max="40"
                          style={{ width: 65 }}
                          value={this.state.length}
                          onChange={e => {
                            this.setState({ length: e.target.value });
                            this.generatePwd();
                          }}
                        />
                      </div>
                    </div>
                    &nbsp;
                    <div className="slider-container">
                      <input
                        className="slider"
                        type="range"
                        min="8"
                        max="40"
                        value={this.state.length}
                        onChange={e => {
                          this.setState({ length: e.target.value }, () => {
                            this.generatePwd();
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <br />
            <div style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <button
                    
                    onClick={() => {
                      this.generatePwd();
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>

              <br />
              <br />
            </div>
          </section>
          
        </div>
      </div>
    );
  }
}

export default App;