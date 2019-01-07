const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs');


app.use((req, res, next) => {
	const now = new Date().toTimeString();
	const log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', err => {
		if (err) {
			console.log('Unable to append server.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		maintMessage: 'Website currently down for maintenance. Sorry for any inconvenience.'
// 	});
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	res.render('welcome.hbs', {
		pageTitle: 'Home',
		message: 'Welcome to the Website!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Us'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		statusCode: 404,
		error: 'ENOTFOUND'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		head: 'Projects'
	});

});


app.listen(port, () => {
	console.log(`Server up on port ${port}`);
});