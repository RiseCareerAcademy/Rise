//take in search, get results from database, return array of users


searchFunction = text => {

  //const { navigation } = this.props;
  //searchInput = navigation.getParam('text');

  searchInput = text.toLowerCase();
  var results = []; //keep search results (user ID's)
  var scores = []; //scores of respective results

  const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(api);
    fetch('http://' + api + '/user/mentor', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {

  for (i = 0; i < responseJson.rows.length; i++){
    //for each user in db
    
    //firstName
    loweredText = responseJson.rows[i].first_name.join().toLowerCase();
    parsedText = loweredText.split();
    if (parsedText.contains(searchInput)){
      indexOf = results.indexOf(responseJson.rows[i].user_id.toString());
      if (indexOf > -1){
          scores[indexOf] += 2;
      }else{
          results[results.length] = responseJson.rows[i].user_id.toString();
          scores[score.length] = 2;
      }
    }

    //lastName
    loweredText = responseJson.rows[i].last_name.join().toLowerCase();
    parsedText = loweredText.split();
    if (parsedText.contains(searchInput)){
      indexOf = results.indexOf(responseJson.rows[i].user_id.toString());
      if (indexOf > -1){
          scores[indexOf] += 2;
      }else{
          results[results.length] = responseJson.rows[i].user_id.toString();
          scores[score.length] = 2;
      }
    }

    //skills
    loweredText = responseJson.rows[i].skills.join().toLowerCase();
    parsedText = loweredText.split();
    if (parsedText.contains(searchInput)){
      indexOf = results.indexOf(responseJson.rows[i].user_id.toString());
      if (indexOf > -1){
          scores[indexOf] += 2;
      }else{
          results[results.length] = responseJson.rows[i].user_id.toString();
          scores[score.length] = 2;
      }
    }

    //Occupation
    loweredText = responseJson.rows[i].occupation.join().toLowerCase();
    parsedText = loweredText.split();
    if (parsedText.contains(searchInput)){
      indexOf = results.indexOf(responseJson.rows[i].user_id.toString());
      if (indexOf > -1){
          scores[indexOf] += 2;
      }else{
          results[results.length] = responseJson.rows[i].user_id.toString();
          scores[score.length] = 2;
      }
    }

  }


})
.catch((error) => {
  console.log("error is: " + error);
});
  
  //sort by score
  for (let i = 1; i < scores.length; i++) {
    for (let j = 0; j < i; j++) {
      if (scores[i] > scores[j]) {
        let x = scores[i];
        scores[i] = scores[j];
        scores[j] = x;
        let y = results[i];
        results[i] = results[j];
        results[j] = y;
      }
    }
  }

  return results;

};





/*
searchFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.title.toUpperCase()}   
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  */