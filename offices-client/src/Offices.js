import React from 'react';
import Office from './Office'

class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the dress currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first dress in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }

    changeOfficeIndex = (action) => {
        let newIndex
        if(action === '-'){
            // if(this.state.offices_index == 0)
            //     newIndex = this.state.offices_count-1
            // else
            newIndex = this.state.offices_index - 1
            this.setState({ offices_index: newIndex })
        }else
            // if(this.state.offices_index == this.state.offices_count-1)
            //     newIndex = 0
            // else
                newIndex = this.state.offices_index + 1
    this.setState ({ offices_index: newIndex })
    }

    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // const offices = this.state.offices_data.map((element)=> {
                //     return (<div>
                //         <Office key={element.officecode} office={element}/>
                //         <hr/>
                //     </div>)
                // })
                // dress table not empty
                return (
                    <div>
                        <b>List of offices from server localhost:8000/offices</b>
                        <Office office={this.state.offices_data[this.state.offices_index]} />
                        <button className={(this.state.offices_index===0?'d-none':'')+ ' btn'} onClick={() => this.changeOfficeIndex('-')}>Previous</button>
                        <button  className={(this.state.offices_index===this.state.offices_count-1?'d-none':'') + ' btn'}  onClick={() => this.changeOfficeIndex('+')}>Next</button>
                        {/* {offices} */}
                    </div>
                )
            }else{
                return(<div><b>Dress table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;