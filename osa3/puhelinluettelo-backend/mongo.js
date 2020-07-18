const mongoose = require('mongoose');
let saveData = false;

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

if (process.argv.length > 3) {
  if (process.argv.length < 5) {
    console.log('give number as argument');
    process.exit(1);
  }
  saveData = true;
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://arto:${password}@cluster0.n8tsc.mongodb.net/persons?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  //id: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number,
  //id: 800,
});

if (saveData) {
  person.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
