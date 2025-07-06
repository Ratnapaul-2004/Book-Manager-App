const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const path = require('path');
const bookRoutes = require('./routers/books');

dotenv.config();

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected: ', process.env.MONGO_URI))
  .catch(err => console.error('Mongo Error:', err));


app.get('/', (req, res) => res.redirect('/books'));
app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
