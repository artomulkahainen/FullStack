const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://arto:${password}@cluster0.n8tsc.mongodb.net/blogs?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'Herpertin matka Kuhmoon',
  author: 'Aleksis Paasikivi',
  url: 'blogspot.com/jea',
  likes: 3,
});

blog.save().then((response) => {
  console.log('note saved!');
  mongoose.connection.close();
});

Blog.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
