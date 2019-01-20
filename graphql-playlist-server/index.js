const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

//schema for roots
const schema = require('./schema/schema');

const app = express();

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




