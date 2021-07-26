import React, {Component} from 'react';
import CharacterDisplay from './CharacterDisplay';
import AccountDisplay from './AccountDisplay';


class ResultHome extends Component {
  constructor(props){
    super(props);
    this.state = {refreshCount: 0}
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleSubmit(event){
    this.setState({refreshCount: this.state.refreshCount+1});
    event.preventDefault();
  }

    render() {
      //return empty page if nothing has been searched
      const results = this.props.results;
      const acc = this.props.acc;
      if(results === undefined || acc === undefined){
        return(null);
      }
      //if the account does not exist let user know
      else if(!results.playerfound){
        return(
          <div id = "display">
            Player Does Not Exist
          </div>
        );
      }
      //Account does exist, displaying results
      else {
        const chars = results.chars;
        if(chars.length === 1){
          //account has 1 character
          return (
              <div id="display">
                <AccountDisplay account={acc}/>
                <CharacterDisplay char = {chars[0]}/>
            </div>
          );
        }else if (chars.length === 2){
          //account has 2 characters
          return (
              <div id="display">
                <AccountDisplay account={acc} />
                <CharacterDisplay char = {chars[0]}/>
                <CharacterDisplay char = {chars[1]}/>
            </div>
          );
        }else{
          //account has 3 characters
            return (
              <div id="display">
                <AccountDisplay account={acc} />
                <CharacterDisplay char = {chars[0]}/>
                <CharacterDisplay char = {chars[1]}/>
                <CharacterDisplay char = {chars[2]}/>
            </div>
          );
        }
      }
    }

}
export default ResultHome;
