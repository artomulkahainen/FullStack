require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

// APP USE -METHODS
app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);
app.use(cors());

// APP POST
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((error) => {
      next(error);
    });
});

// GET -METHODS

app.get('/info', (req, res) => {
  const countPersons = (persons) =>
    persons.reduce((total, person) => total + 1, 0);

  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${countPersons(
        persons
      )} people</p><p>${new Date()}</p>`
    );
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    persons.forEach((person) => console.log(person));
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// DELETE -METHOD

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT -METHOD

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { $set: { number: body.number } },
    { new: true }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// HANDLING UNKNOWN ENDPOINT

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// HANDLE ERROR
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

// APP LOAD
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
