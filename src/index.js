const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
const req = require('express/lib/request');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const user = users.find(u => u.username === request.headers.username);
  if (!user) {
    return response.status(400).json({ error: 'User not found' });
  }
  request.user = user;
  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body
  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }
  users.push(user)
  return response.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request
  const { todos } = users.find(u => u.name = user.name)
  return response.json(todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;