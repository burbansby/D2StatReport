import React, {Component} from 'react';
import Form from 'react-bootstrap/form';
import CharacterDisplay from './CharacterDisplay';

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
      const results = this.props.results;
      if(results === undefined){
        return(null);
      }
      else if(results.chars.length === 0){
        return (
            <div>
                Character missing? Try Refreshing
               <Form onSubmit={this.handleSubmit}>
                <input type="submit" value="Refresh Data" />
               </Form>
            </div>
        );
      }
      else if(results.chars.playerfound === false){
        return(
          <div>
            Player Does Not Exist
          </div>
        );
      }
      else{
        //confirmed have charscter results
        const chars = results.chars;
        if(chars.length === 1){
          //account has 1 character
          return (
            <div id = "display">
                <CharacterDisplay char = {chars[0]}/>

                Character missing? Try Refreshing
               <Form onSubmit={this.handleSubmit}>
                <input type="submit" value="Refresh Data" />
               </Form>
            </div>
          );
        }else if (chars.length === 2){
          //account has 2 characters
          return (
            <div id = "display">
                <CharacterDisplay char = {chars[0]}/>
                <CharacterDisplay char = {chars[1]}/>

                Character missing? Try Refreshing
               <Form onSubmit={this.handleSubmit}>
                <input type="submit" value="Refresh Data" />
               </Form>
            </div>
          );
        }else{
          //account has 3 characters
          return (
            <div id = "display">
                <CharacterDisplay char = {chars[0]}/>
                <CharacterDisplay char = {chars[1]}/>
                <CharacterDisplay char = {chars[2]}/>

                Character missing? Try Refreshing
               <Form onSubmit={this.handleSubmit}>
                <input type="submit" value="Refresh Data" />
               </Form>
            </div>
          );
        }
      }
    }

}
export default ResultHome;
