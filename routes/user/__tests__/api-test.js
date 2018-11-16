const execSync = require('child_process').execSync;
output = execSync('newman run routes/user/__tests__/AddingMentee.postman_collection.json', { encoding: 'utf-8' });  
console.log('Output was:\n', output);
output = execSync('newman run routes/user/__tests__/AddingMentor.postman_collection.json', { encoding: 'utf-8' });  
console.log('Output was:\n', output);