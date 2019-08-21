import React from 'react'

class Search extends React.Component  {
    state = {
        filteredBy: ''
    }
    handleChange = (event) => {
        const newTerm = event.target.value

        this.setState({
            filteredBy: newTerm,
         })
         // console.log(this.state.searchTerm)
    }
    render(){
        return (

        // <div className="ui huge fluid icon input">
        //   <input type="text" placeholder={"Search your Recent Transactions"} onChange={props.handleChange} />
        //   <i className="circular search link icon"></i>
        // </div>

            <div>
                <input
                type="text" 
                placeholder="Search Account Groups" 
                name="filteredBy"
                onChange={this.handleChange}
            />
            <button onClick={this.props.handleFilter}>Search</button>
            {/* <button>Show All</button> */}
            </div>
            )
    }   
}

export default Search
