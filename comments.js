// Create web server
// Run: node comments.js
// Then: http://localhost:3000/
// Then: http://localhost:3000/comments
// Then: http://localhost:3000/comments/1
// Then: http://localhost:3000/comments/2
// Then: http://localhost:3000/comments/3

var express = require('express');
var app = express();

var comments = [
	{ name: 'tobi', body: 'meow' },
	{ name: 'loki', body: 'mew' },
	{ name: 'jane', body: 'nya' }
];

app.use(express.bodyParser());

app.get('/', function(req, res){
	res.send('<form method="post" action="/comments">'
		+ '<input type="hidden" name="_method" value="put" />'
		+ '<input type="hidden" name="user[name]" value="tobi" />'
		+ '<input type="hidden" name="user[body]" value="ferret" />'
		+ '<input type="submit" value="Update" />'
		+ '</form>');
});

app.get('/comments', function(req, res){
	res.send(comments);
});

app.post('/comments', function(req, res){
	var comment = req.body.user;
	comment.created_at = new Date;
	comments.push(comment);
	res.redirect('back');
});

app.get('/comments/:id', function(req, res){
	var id = req.params.id;
	var comment = comments[id];
	if (comment) {
		res.send('<p>User: <strong>' + comment.name + '</strong></p>'
			+ '<p>Comment: <strong>' + comment.body + '</strong></p>');
	} else {
		res.send('Sorry! No comment found.');
	}
});

app.put('/comments/:id', function(req, res){
	var id = req.params.id;
	var comment = comments[id];
	comment.name = req.body.user.name;
	comment.body = req.body.user.body;
	res.redirect('back');
});

app.listen(3000);
console.log('Express app started on port 3000');