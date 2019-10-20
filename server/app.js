const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/graphql-sample');
mongoose.connection.once('open' , () => {
    console.log('connection to database')
});


app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}));

//callback function notify express is lisening on port 4000
app.listen (4000,() => {
    console.log("now listen to the port 4000");
});




//mongodb+srv://admin:<password>@gettingstarted-vni0e.mongodb.net/test?retryWrites=true&w=majority
