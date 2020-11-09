import React, {Component} from 'react';

class CharacterDisplay extends Component {


    render() {
        const char = this.props.char;
        return (
            <div id={char.class}>
              <div id = "basics">
                <img src={char.emblem} alt="emblem" id = "emblem"/>
                <h3>{char.class}, {char.race} {char.gender}</h3>
                <h4>Light: {char.light}</h4>
              </div>
              <div id = "data_wrapper">
              <div id = "data">
                <h4>PVE Stats</h4>
                <p>K/D: {char.pvekd}</p>
                <p>Favorite Weapon Type: {char.pveweapon}</p>
                <p>Strikes Completed: {char.strikes}</p>
                <p>Fastest Strike: {char.fasteststrike}</p>
                <p>Raids Completed: {char.raids}</p>
              </div>
              <div id = "data">
                <h4>PVP Stats</h4>
                <p>K/D: {char.pvpkd}</p>
                <p>Win Rate: {char.pvpwins}%</p>
                <p>Average Kills: {char.pvpkills}</p>
                <p>Favorite Weapon Type: {char.pvpweapon}</p>
                <p>Best Game: {char.pvpmostkills} kills</p>
              </div>
              <div id = "data">
                <h4>Gambit Stats</h4>
                <p>K/D: {char.gambitkd}</p>
                <p>Win Rate: {char.gambitwins}%</p>
                <p>Average Kills: {char.gambitkills}</p>
                <p>Favorite Weapon Type: {char.gambitweapon}</p>
                <p>Average Blockers Sent: {char.sentBlockers}</p>
              </div>
              </div>

            </div>
        );
    }
}


export default CharacterDisplay;
