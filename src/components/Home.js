import React, { Component } from 'react';
import Search from './Search';
import ResultHome from './ResultHome';
import './Style.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {player: undefined,
                  platform: -1,
                  charList: undefined,
                  acc: undefined,
                  isFetching: false
                  }
  }

  //Updating player info from the search component
    update(info) {
      this.setState({ charList: info[0] });
      this.setState({ acc: info[1] });
  }

  //page rendering
    render() {
        return (
          <div id = "Home">
            <div id = "banner">
              <h1>Destiny 2 Stat Report</h1>
            </div>
            <Search sendData = {this.update.bind(this)}/>
            <ResultHome results = {this.state.charList} acc={this.state.acc}/>
          </div>
        );
      }
}
export default Home;
