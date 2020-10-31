//Prototype for the character object to be saved in the character array
export default class Character{
  constructor(charData, charStats){
    if(charData && charStats){
      this.playerfound = true;
      this.charID = charData.characterId;
      this.class = this.getClassByID(charData.classType);
      this.gender = this.getGenderByID(charData.genderType);
      this.race = this.getRaceByID(charData.raceType);
      this.light = charData.light;

      this.pvekd = charStats.allPvE.allTime.killsDeathsRatio.basic.value.toFixed(2);
      if(charStats.allStrikes.allTime !== undefined){
        this.strikes = charStats.allStrikes.allTime.activitiesCleared.basic.value;
      }else{this.strikes = 0;}
      if(charStats.raid.allTime !== undefined){
        this.raids = charStats.raid.allTime.activitiesCleared.basic.value;
      }else{this.raids = 0;}

      if(charStats.allPvP.allTime !== undefined){
        this.pvpkd = charStats.allPvP.allTime.killsDeathsRatio.basic.value.toFixed(2);
        this.pvpwins = (charStats.allPvP.allTime.activitiesWon.basic.value/charStats.allPvP.allTime.activitiesEntered.basic.value).toFixed(2)*100;
      }else{
        this.pvpkd = 0;
        this.pvpwins = 0;
      }

      if(charStats.allPvECompetitive.allTime !== undefined){
        this.gambitkd = charStats.allPvECompetitive.allTime.killsDeathsRatio.basic.value.toFixed(2);
        this.gambitwins = (charStats.allPvECompetitive.allTime.activitiesWon.basic.value/charStats.allPvECompetitive.allTime.activitiesEntered.basic.value).toFixed(2)*100;
      }else{
        this.gambitkd = 0;
        this.gambitwins = 0;
      }
    }
    else{
      this.playerfound = false;
    }
  }

  //ID deciphering
  getClassByID(id){
    if(id === 0){
      return "Titan";
    }
    else if(id ===  1){
      return "Hunter";
    }
    else{
      return "Warlock";
    }
  }

  getRaceByID(id){
    if(id === 0){
      return "Human";
    }
    else if(id === 1){
      return "Awoken";
    }
    else{
      return "Exo";
    }
  }

  getGenderByID(id){
    if(id === 0){
      return "Male";
    }
    else{
      return "Female";
    }
  }

}
