import Character from './Character.js';
const apiKey = 'Replace with api key';


//Does the API search and returns a list of character objects to the home
export default class CharList{
  constructor(name, plat){
    this.name = name;
    this.plat = plat;
    this.chars = [];
    this.retrieveInfo();
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
    //get info id and type from display name
    var json = await this.getRequest(`https://www.bungie.net/platform/Destiny2/SearchDestinyPlayer/${this.plat}/${this.name}/`);

    if (json.Response[0]){
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
        this.chars = this.chars.concat(newChar);
      }
    }else{
      this.chars = new Character(null, null);
    }
  }




}
