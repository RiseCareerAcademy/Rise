//take in search, get results from database, return array of users


searchFunction = text => {

  //const { navigation } = this.props;
  //searchInput = navigation.getParam('text');
  
  fakeData = [
    ["Daniel Ng"],
    ["Software Developer"],
    ["JQuery", "Python", "UX"], //should be number 4
    ["Tracy Lewis"],
    [""],
    ["UX", "Prototyping"], //should be number 3
    ["Kevin Mui"],
    ["Product Manager"],
    [""], //should be number 2
    ["Lewis Tracy"],
    ["Product Manager"],
    ["UX"], //should be number 1
    ["Tone Yu"],
    ["Nurse"],
    ["Birthing", "Yelling", "Running"] //should not be in the results
  ];

  searchInput = text;
  matches = [];
  scores = [];
  if (searchInput.length == 0 || fakeData.length == 0){
    return {scores,matches}
  }
  
    for (let j = 0; j < fakeData.length; j += 3) {
      var parsedData = fakeData[j+2].toString().split(' ');
      for(let k = 0; k < parsedData.length; k++){
        if (parsedData[k].indexOf(searchInput) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 1;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 1;
          }
        }
      }
      if (fakeData[j+2].indexOf(searchInput) > -1) {
        //if matching skill, add to match list, score ++
        if (matches.indexOf(fakeData[j]) > -1)
          //if already has points
          scores[matches.indexOf(fakeData[j])] += 1;
        else {
          //else add to list of matches with new score
          matches[matches.length] = fakeData[j];
          scores[scores.length] = 1;
        }
      }
    }
  
    for (let j = 0; j < fakeData.length; j += 3){
      var parsedData = fakeData[j+1].toString().split(' ');
      for(let k = 0; k < parsedData.length; k++){
        if (parsedData[k].indexOf(searchInput) > -1) {
          if (matches.indexOf(fakeData[j]) > -1)
            //if matching skill, add to match list, score ++
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 2;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 3;
          }
        }
      }
      if (fakeData[j+1].indexOf(searchInput) > -1) {
        //if matching skill, add to match list, score ++
        if (matches.indexOf(fakeData[j]) > -1)
          //if already has points
          scores[matches.indexOf(fakeData[j])] += 2;
        else {
          //else add to list of matches with new score
          matches[matches.length] = fakeData[j];
          scores[scores.length] = 2;
        }
      }
    }
  
    for (let j = 0; j < fakeData.length; j += 3){
      var parsedData = fakeData[j].toString().split(' ');
      for(let k = 0; k < parsedData.length; k++){
        if (parsedData[k].indexOf(searchInput) > -1) {
          if (matches.indexOf(fakeData[j]) > -1)
            //if matching skill, add to match list, score ++
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 2;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 2;
          }
        }
      }
      if (fakeData[j].indexOf(searchInput) > -1) {
        //if matching skill, add to match list, score ++
        if (matches.indexOf(fakeData[j]) > -1)
          //if already has points
          scores[matches.indexOf(fakeData[j])] += 2;
        else {
          //else add to list of matches with new score
          matches[matches.length] = fakeData[j];
          scores[scores.length] = 2;
        }
      }
    }
    

  //sort by score
  for (let i = 1; i < scores.length; i++) {
    for (let j = 0; j < i; j++) {
      if (scores[i] > scores[j]) {
        let x = scores[i];
        scores[i] = scores[j];
        scores[j] = x;
        let y = matches[i];
        matches[i] = matches[j];
        matches[j] = y;
      }
    }
  }

  return { scores, matches };

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
  