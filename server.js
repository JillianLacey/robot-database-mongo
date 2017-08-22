const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/introDemo";


const app = express();
const data = require("./data")
const port = process.env.PORT || 8004;


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static('public'));
app.set("view engine", "mustache");


app.get("/", (req, res) => {
    res.render("index", { users: data.users });
});

app.get("/:id", (req, res) => {
    let userId = req.params.id;
    let user = data.users.find(user => user.id === parseInt(userId));
    res.render("profile", user);
});

//this is where we're importing data from data.js?
app.get("/insertMany", function(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) {
        res.status(500).send(err);
      }
  
      let People = db.collection("people");
  
      People.insertMany(people, function(err, savedPeople) {
        if (err) {
          res.status(500).send(err);
        }
  
        res.send(savedPeople);
        db.close();
      });
    });
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
