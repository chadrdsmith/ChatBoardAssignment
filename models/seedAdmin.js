var md5 = require ('md5');

var seed = function(User) {
    User.find(function(err, user) {
        if (user.length) return;

        var admin = new User({
            username: 'admin',
            password: md5('admin'),
            isAdmin: true,
            canPost: true,
        }).save();
    });
};

module.exports = {
    seed: seed
}

