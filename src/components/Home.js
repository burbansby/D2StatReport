import React, { Component } from 'react';
import Form from 'react-bootstrap/form';
import CharList from './CharList';
import ResultHome from './ResultHome';
import './Style.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {player: undefined,
                  platform: -1,
                  charList: undefined,
                  isFetching: false
                  }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    this.setState({isFetching: true});
    var list =  new CharList(this.state.player, this.state.platform);
    this.setState({charList: list});
    this.setState({isFetching: false});
    event.preventDefault();
  }

    render() {
      if(this.state.isFetching){
        return (
          <div id = "Home">
            Loading Character....
          </div>
        );
      }
      else{
        return (
          <div id = "Home">
          <div id = "banner">
            <h1>Destiny 2 Stat Report</h1>
          </div>
          <div id = "search">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId = "profile name">
                <Form.Control
                  type="text"
                  name = "player"
                  placeholder = "Enter Display Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId = "platform">
                <Form.Label>Platform:</Form.Label>
                <Form.Check
                  type="radio"
                  name = "platform"
                  label = "Steam"
                  value= "3"
                  checked = {this.state.platform === "3"}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  name = "platform"
                  label = "PlayStation"
                  value= "2"
                  checked = {this.state.platform === "2"}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  name = "platform"
                  label = "Xbox"
                  value= "1"
                  checked = {this.state.platform === "1"}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  name = "platform"
                  label = "Stadia"
                  value= "5"
                  checked = {this.state.platform === "5"}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <input type="submit" value="Search Player" />
            </Form>


            <ResultHome results = {this.state.charList} />

            </div>
          </div>
        );
      }
    }
}
export default Home;
