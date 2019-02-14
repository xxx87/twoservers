let express = require('express');
let app = express();
let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');
let env = require('dotenv').load();
let exphbs = require('express-handlebars');

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// For Passport
app.use(session({ // session secret
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './sequelizeapp/views');
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Models
let models = require("./sequelizeapp/models");

//Routes
let authRoute = require('./sequelizeapp/routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
	console.log('Nice! Database looks fine')
}).catch(function(err) {
	console.log(err, "Something went wrong with the Database Update!")
});

const port = 3333;
app.listen(port, function(err) {
	if(!err)
		console.log("Site is live on port: ", port);
	else console.log(err)
});
