import React, { Component } from 'react';

class AccountDisplay extends Component {


    render() {
        const acc = this.props.account;
        return (
            <div id="header">
                <div id="basics">
                    <h3>{acc.name}</h3>
                    <h4>Number of Characters: {acc.numChars}</h4>
                    <h4>{acc.playtime}</h4>
                </div>
                <div id="data_wrapper">
                    <div id="data">
                        <p>Strike Clears: {acc.strikes}</p>                    
                    </div>

                    <div id="data">
                        <p>Raid Clears: {acc.raids}</p>
                    </div>

                    <div id="data">
                        <p>Best PvP Game: {acc.pvpMostKills} Kills</p>
               
                    </div>
                </div>

            </div>
        );
    }
}


export default AccountDisplay;
