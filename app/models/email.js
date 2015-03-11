var Q = require('q');
var nodemailer = require('nodemailer');

var Email = {
  send: function(to, subject, message) {
    var deferred = Q.defer();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ENV_VARIABLES.GMAIL_USER,
        pass: process.env.ENV_VARIABLES.GMAIL_PASS
      }
    });

    var data = {
      from: process.env.ENV_VARIABLES.GMAIL_USER,
      to: to,
      subject: subject,
      message: message
    };

    transporter.sendMail(data, function(err, result) {
      if (err) {
        return deferred.reject(err);
      }

      return deferred.resolve(result);
    });

    return deferred.promise;
  },

  sendDefault: function(to) {
    var deferred = Q.defer();
    var subject = 'Hello';
    var message = 'This is a test';

    Email.send(to, subject, message)
    .then(function(result) {
      return deferred.resolve(result);
    }, function(err) {
      return deferred.reject(err);
    });

    return deferred.promise;
  }
};

module.exports = Email;
