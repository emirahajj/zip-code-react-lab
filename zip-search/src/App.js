import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';


function City(props) {
  return (
  <Card>
  <Card.Header>{props.city}</Card.Header>
  <Card.Body>
    <ul>
      <li>State: </li>
      <li>Location: </li>
      <li>Population (estimated): </li>
      <li>Total Wages: </li>
    </ul>
  </Card.Body>
  </Card>);
}

function ZipSearchField(props) {
  return (
  <div>
    <label>Zip Code:</label>
    <input type="text" onChange={props.onChange}/>
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
    //when the user backspaces to get rid of the zip they entered, the cities array should be reset
    let citiesArray = this.state.cities
    if (this.state.zipCode === ""){
      this.setState({
        cities: []
      })
    }
    //called fetch in a callback to the set state function since setState doesn't always immediately update compoenent
    this.setState({
      zipCode: e.target.value,
    }, () => {
      if(this.state.zipCode.length === 5){
        fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipCode}`)
        .then(response => response.json())
        .then(body => {
          body.forEach(element => {
            citiesArray.push(`${element["City"]}, ${element["State"]}`)
            this.setState({
              cities: citiesArray
            })
          });
          })
      }
    })
  }

  render() {
    let citiesArray = this.state.cities;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange = {(e)=> this.zipChanged(e)}/>
        <div>
        {citiesArray.map(element => {
      return(<City city = {element}/>)
    })}
        </div>
      </div>
    );
  }
}

export default App;