const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (fn, ln, id, em) {
  return _createToken(fn, ln, id, em);
};

_createToken = function (fn, ln, id, em) {
  try {
    const expiration = new Date();
    const user = { firstName: fn, lastName: ln, userId: id, email: em };

    // const accessToken =  jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "365d",
    });

    // In order to exoire with a value other than the default, use the
    // following
    /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */

    var ret = { accessToken: accessToken };
  } catch (e) {
    var ret = { error: e.message };
  }
  return ret;
};

exports.isExpired = function (token) {
  var isError = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, verifiedJwt) => {
      if (err) {
        return true;
      } else {
        return false;
      }
    }
  );

  return isError;
};

exports.refresh = function (token) {
  var ud = jwt.decode(token, { complete: true });

  var userId = ud.payload.id;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;
  var userEmail = ud.payload.email;

  return _createToken(firstName, lastName, userId, userEmail);
};
