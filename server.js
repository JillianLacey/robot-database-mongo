const express = require("express");
const mongo = require("mongodb");
const mustacheExpress = require("mustache-express");
const path = require("path");
const logger = require("morgan");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/mongoRobots";
const app = express();

let DB;
let Robots;

const port = process.env.PORT || 8004;

///VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "./public")));

//INITIAL CHECK 
MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
      return console.log("Error connecting to the database:", err);
    }
  
    DB = db;
    Robots = db.collection("robots");
  });


//ENDPOINT THAT CONNECTS TO OUR DB
  app.get("/insertMany", function(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
      if (err) {
        res.status(500).send(err);
      }
  
      let Robots = db.collection("robots");
  
      Robots.insertMany(data.users, function(err, savedRobots) {
        if (err) {
          res.status(500).send(err);
        }
  
        res.send(savedRobots);
        db.close();
      });
    });
  });

  
  app.get("/profile/:_id", (req, res) => {
    Robots.findOne({ _id: ObjectId(req.params._id)}, function(err, foundRobot) {
      if (err) {
       return res.status(500).send(err);
      }
     else if (!foundRobot) {
        return res.send("No user found");
     } 
      return res.render("profile", { user: foundRobot });
    });
  });

  app.get("/", (req, res) => {
    Robots.find({}).toArray((err, foundRobots) => {
      if (err) res.status(500).send(err);
      res.render("index", { users: foundRobots });
    });
  });


  app.get("/employed", (req, res) => {
    Robots.find({ job: { $ne: null } }).toArray(function (err, employedRobots) {
        if (err) res.status(500).send(err);
        res.render("index", { users: employedRobots });
    });
});

app.get("/unemployed", (req, res) => {
    Robots.find({ job: null }).toArray(function (err, unemployedRobots) {
        if (err) res.status(500).send(err);
        res.render("index", { users: unemployedRobots });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
