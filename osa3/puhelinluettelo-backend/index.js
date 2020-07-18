const express = require('express');
const app = express();
const database = require('./db.json');
const morgan = require('morgan');
const cors = require('cors');

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// APP USE -METHODS

app.use(express.json());
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);
app.use(cors());
app.use(express.static('build'));

// GET -METHODS

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      database.persons.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(database.persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const person = database.persons.find((person) => person.id === id);
  console.log(person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// POST -METHOD

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number || !body.id) {
    if (!body.name) {
      return res.status(404).json({ error: 'name is missing' });
    } else if (!body.number) {
      return res.status(404).json({ error: 'number is missing' });
    } else {
      return res.status(404).json({ error: 'id is missing' });
    }
  }

  const check = database.persons.filter((person) => person.name === body.name);

  if (check.length >= 1) {
    return res.status(404).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId,
  };

  database.persons.concat(person);
  res.json(person);
});

// DELETE -METHOD

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  database.persons = database.persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// APP PORT AND LOAD

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
