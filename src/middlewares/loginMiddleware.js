const path = require('path');
const fs = require('fs');
const db = require('../database/models');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

function rememberMiddleware(req, res, next) {
  /*--Primero se setea una session, en caso de no tenerla pero SI tener una cookie----*/
  if(req.cookies.recordame != undefined && req.session.user == undefined) {
        db.User.findOne({
        /*---Se usa un hashId para que nunca cambie, y sea mas segura la cookie---*/
          where: {
            hash_id: req.cookies.recordame
          }
        }).then(user => {
          return req.session.user = user
        }).catch(err => {
          let ErrorsJSON = JSON.stringify(err);
          fs.appendFileSync(ErrorsDir, ErrorsJSON);
        })
  }
  /*--Luego se guarda la variable locals, partiendo de la session ya abierta o generada mediante la cookie--*/
  if (req.session.user != undefined) {

    res.locals.user = req.session.user;

  }

next ();
}

module.exports = rememberMiddleware;