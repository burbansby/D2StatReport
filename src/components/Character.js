//Prototype for the character object to be saved in the character array
export default class Character{
  constructor(charData, charStats){
    //console.log(charData);  //print general character data
    //console.log(charStats); //print character activity stats
    if(charData && charStats){
      this.playerfound = true;
      this.charID = charData.characterId;
      this.class = this.getClassByID(charData.classType);
      this.gender = this.getGenderByID(charData.genderType);
      this.race = this.getRaceByID(charData.raceType);
      this.light = charData.light;
      this.emblem = "http://www.bungie.net".concat(charData.emblemPath);
      this.playtime = this.getTime(charData.minutesPlayedTotal);

      this.pvekd = charStats.allPvE.allTime.killsDeathsRatio.basic.value.toFixed(2);
      this.pveweapon = charStats.allPvE.allTime.weaponBestType.basic.displayValue;
      if(charStats.allStrikes.allTime !== undefined){
        this.strikes = charStats.allStrikes.allTime.activitiesCleared.basic.value;
        var fast = charStats.allStrikes.allTime.fastestCompletionMs.basic.displayValue;
        this.fasteststrike = fast.substring(0, fast.length-4);
      }else{
        this.fasteststrike = "None Completed";
        this.strikes = 0;
      }
      if(charStats.raid.allTime !== undefined){
        this.raids = charStats.raid.allTime.activitiesCleared.basic.value;
      }else{
        this.raids = 0;
      }

      if(charStats.allPvP.allTime !== undefined){
        this.pvpweapon = charStats.allPvP.allTime.weaponBestType.basic.displayValue;
        this.pvpkills = charStats.allPvP.allTime.kills.pga.value.toFixed(2);
        this.pvpkd = charStats.allPvP.allTime.killsDeathsRatio.basic.value.toFixed(2);
        this.pvpwins = (charStats.allPvP.allTime.winLossRatio.basic.value).toFixed(2)*50;
        this.pvpmostkills = charStats.allPvP.allTime.bestSingleGameKills.basic.displayValue;
      }else{
        this.pvpkills = 0;
        this.pvpmostkills = 0;
        this.pvpweapon = "None Used";
        this.pvpkd = 0;
        this.pvpwins = 0;
      }

      if(charStats.allPvECompetitive.allTime !== undefined){
        this.sentBlockers = this.findSentBlockers(charStats.allPvECompetitive.allTime);
        this.gambitweapon = charStats.allPvECompetitive.allTime.weaponBestType.basic.displayValue;
        this.gambitkills = charStats.allPvECompetitive.allTime.kills.pga.value.toFixed(2);
        this.gambitkd = charStats.allPvECompetitive.allTime.killsDeathsRatio.basic.value.toFixed(2);
        this.gambitwins = (charStats.allPvECompetitive.allTime.winLossRatio.basic.value).toFixed(2)*50;
      }else{
        this.gambitkills = 0;
        this.gambitweapon = "None Used";
        this.sentBlockers = 0;
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

  getTime(minutes){
    var mins = parseInt(minutes);
    var hours = Math.floor(mins/60);
    mins = mins%60;
    return `${hours} Hours and ${mins} Minutes Played`;
  }

  findSentBlockers(stats){
    var small = stats.smallBlockersSent.basic.value
    var med = stats.mediumBlockersSent.basic.value
    var large = stats.largeBlockersSent.basic.value
    return ((small+med+large)/stats.activitiesEntered.basic.value).toFixed(2);
  }


}
