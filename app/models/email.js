var Q = require('q');
var nodemailer = require('nodemailer');

var Email = {
  send: function(to, subject, message) {
    var deferred = Q.defer();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    var data = {
      from: process.env.GMAIL_USER,
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

  sendDefault: function(to, trail) {
    var deferred = Q.defer();
    var subject = 'Verify email signup for ' + process.env.APP_NAME + trail;
    var message = 'Hello,\n'
                + 'To verify your account email, simply click the link below.\n'
                + '\n'
                + 'https://6compass.com/verify-email/' + trail +
                + '\n'
                + 'Thanks.';

    Email.send(to, subject, message)
    .then(function(result) {
      return deferred.resolve(result);
    }, function(err) {
      return deferred.reject(err);
    });

    return deferred.promise;
  },

  verifiedQ: function(earlybird) {
    var deferred = Q.defer();
    var subject = 'Your email is verified!';
    var message = 'Your email is verified! We\'ll send you an invite when we launch. In the meantime, please follow @6compass on Twitter to hear the latest news.';
    var to = earlybird.email;

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
