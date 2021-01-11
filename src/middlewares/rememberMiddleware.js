const path = require('path');
const fs = require('fs');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));

function rememberMiddleware(req, res, next) {
  
    console.log(req.cookies.recordame);
    console.log(req.session.user);
  if(req.cookies.recordame != undefined && req.session.user == undefined) {
        users.forEach(user => {
            if (req.cookies.recordame == user.email) {
               req.session.user = user;
            }
        })
}
next ();
}
module.exports = rememberMiddleware;