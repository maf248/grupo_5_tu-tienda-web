const path = require('path');
const fs = require('fs');
const { localsName } = require('ejs');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));

function rememberMiddleware(req, res, next) {
  
  if(req.cookies.recordame != undefined && req.session.user == undefined) {
        users.forEach(user => {
            if (req.cookies.recordame == user.email) {
               req.session.user = user;
            }
        })
  }
  if (req.session.user != undefined) {

    res.locals.user = req.session.user;

  }

next ();
}
module.exports = rememberMiddleware;