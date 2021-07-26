//prototype for card that displays shared stats for all characters 
export default class Account {
    constructor(charList, name) {
        this.name = name;
        this.numChars = 0;
        this.raids = 0;
        this.playtime = 0;
        this.pvpMostKills = 0;
        this.strikes = 0;

        charList.forEach((char) => {
            this.numChars += 1;
            this.raids += char.raids;
            this.playtime += parseInt(char.playtimeMins);
            this.pvpMostKills = Math.max(this.pvpMostKills, parseInt(char.pvpmostkills));
            this.strikes += char.strikes;
        })
        this.playtime = this.getTime(this.playtime);
        
    }

    getTime(mins) {
        var hours = Math.floor(mins / 60);
        mins = mins % 60;
        return `${hours} Hours and ${mins} Minutes Played`;
    }
}