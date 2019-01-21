const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

//schema for roots
const schema = require('./schema/schema');

const app = express();
//allow cross origin request
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kxqfi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
  .then((db) => {

    app.listen(4000, () => {
      console.log('Server is running');
    });
  }).catch(err => {
    console.log(err);
  });




