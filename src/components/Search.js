import React, { Component } from 'react';
import Form from 'react-bootstrap/form';
import Character from './Character.js';
import CharList from './CharList.js';
import {apiKey} from '../key.js';

//Does the API search and returns a list of character objects to the home
class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      player: undefined,
      platform: -1,
      chars: [],
      fetching: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Updates searchbar while typing
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Executed when seach is clicked
  handleSubmit(event) {
    if(this.state.player){
      this.retrieveInfo();
    }
    event.preventDefault();
  }


  //performs get requests given the path
  getRequest(path){
    return new Promise(function (resolve, reject){
      var xhr = new XMLHttpRequest();

      //get profile
      xhr.open("GET", path, true);
      xhr.setRequestHeader("X-API-Key", apiKey);
      xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
          var json = JSON.parse(this.responseText);
          if(json){
            resolve(json);
          }
          else{
            reject("error");
          }
        }
      }
        xhr.send();
    });
  }

  //performs the workload of all api searches and data retrieval
  async retrieveInfo(){
    this.setState({fetching: true})
    this.setState({chars: []});
    //get info id and type from display name
    var json = await this.getRequest(`https://www.bungie.net/platform/Destiny2/SearchDestinyPlayer/${this.state.platform}/${this.state.player}/`);

    if (json.Response[0]){
      //player exists
      const type = json.Response[0].membershipType;
      const id = json.Response[0].membershipId;

      //get account info, specifically character ids
      json = await this.getRequest(`https://www.bungie.net/platform/Destiny2/${type}/Profile/${id}/?components=100`);
      const chars = json.Response.profile.data.characterIds;


      //Get info for every character
      for( var i = 0; i < chars.length; i++){
        json = await this.getRequest(`https://www.bungie.net/platform/Destiny2/${type}/Profile/${id}/Character/${chars[i]}/?components=200`);
        //console.log(json.Response.character.data); //use this to see more character info from db
        const charData = json.Response.character.data;
        json = await this.getRequest(`https://www.bungie.net/platform/Destiny2/${type}/Account/${id}/Character/${chars[i]}/Stats/`);
        //console.log(json.Response); //use this to see more stats from db
        const charStats = json.Response;

        //If more requests are added put them here

        const newChar = new Character(charData,charStats);
        this.setState({chars: this.state.chars.concat(newChar)});

        //Send if finished
        if(this.state.chars.length === chars.length){
          this.props.sendData(new CharList(true, this.state.chars));
          this.setState({fetching: false});
        }
      }
    }else{
      //player does not exist
      this.props.sendData([new CharList(false, undefined)]);
      this.setState({fetching: false});
    }
  }


  render(){
    if(this.state.fetching){
      return(
        <div id = "search">
        <p>Searching for player...</p>
        </div>

      );
    }else{
    return(
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
        </div>
    );
  }
  }
}
export default Search;
