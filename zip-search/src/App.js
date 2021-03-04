import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div>This is the City component</div>);
}

function ZipSearchField(props) {
  return (
  <div>
    <label>Zip Code:</label>
    <input type="text" onChange={(e) => console.log(e.target.value)}/>
  </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode: '',
      cities: []
    }
  }
  zipChanged(e){
    //make fetch call here
    this.setState({
      zipCode: e.target.value
    })

    


  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={(e)=> this.zipChanged(e)}/>
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;