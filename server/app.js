const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8484;

// add your code here

const todoData = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => { //the / route will be an object with a status key and str value 'ok'
	res.status(200).send({status:'ok'});

});

app.get('/api/TodoItems', (req, res) => { // read all todo items from list; if success- status code 200
	res.status(200).send(todoData);
});

app.get('/api/TodoItems/:number', (req, res) => { // Read a single todo item from the list...
	//...will include an object of the specific todo requested
	
	for(let i = 0; i < todoData.length; i++) {
		if(todoData[i].todoItemId == req.params.number) {
			res.status(200).send(todoData[i]);
			}
	}
	
	
})

app.post('/api/TodoItems', (req, res) => {// add an item to the dataset...
	//...if there is already an item with a matching todoItemId, overwrite the existing item
	
	for(let i = 0; i < todoData.length; i++) {
		if(req.body.todoItemId == todoData[i].todoItemId) {
			todoData[i] = req.body;
		} else {
			todoData.push(req.body);
		};
	};
	res.status(201).send(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => { // use route parameter to remove the item with a matching todoItemId from the dataset
	// will include a copy of the the item deleted.
	const newItem = Number(req.params.number);
	if(todoData[newItem]) {
			const newData = todoData.splice(newItem, 1);
			res.status(200).send(newData[0]);
		}
	
	
});










module.exports = app;
