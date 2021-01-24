const path = require('path');
const fs = require('fs');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));

function rememberMiddleware(req, res, next) {
  /*--Primero se setea una session, en caso de no tenerla pero SI tener una cookie----*/
  if(req.cookies.recordame != undefined && req.session.user == undefined) {
        users.forEach(user => {
          /*---Se usa un hashId para que nunca cambie, y sea mas segura la cookie---*/
            if (req.cookies.recordame == user.hashId) {
               req.session.user = user;
            }
        })
  }
  /*--Luego se guarda la variable locals, partiendo de la session ya abierta o generada mediante la cookie--*/
  if (req.session.user != undefined) {

    res.locals.user = req.session.user;

  }

next ();
}

module.exports = rememberMiddleware;