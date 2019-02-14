const exp = {};

exp.signup = function(req, res) {
    res.render('signup');
};
exp.signin = function(req, res) {
    res.render('signin');
};
exp.dashboard = function(req, res) {
    res.render('dashboard');
};
exp.main = function(req, res) {
    res.render('main');
};
exp.home = function(req, res) {
    res.render('home');
};
exp.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });

};
module.exports = exp;
