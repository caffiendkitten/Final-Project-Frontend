import React, { PureComponent } from "react";


export default class Toggle extends PureComponent {
  render() {    
    return (
      <div className="tooltip">
        <span className="tooltiptext" id="myTooltip" onClick={() => {
            let copyText = document.getElementById("input");
            copyText.select();
            document.execCommand("copy");
            let tooltip = document.getElementById("myTooltip");
            tooltip.textContent = "Successfully copied to clipboard ";
          }}>
          Copy to clipboard [X]
        </span>
      </div>
    );
  }
}