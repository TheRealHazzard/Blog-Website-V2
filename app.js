
//Requiring Node Modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

//Blog Base Content
const homeStartingContent = "Hello Stranger. My Name is Robin J Thomas and I'm a B.Tech CSE student at VIT Chenna. This Blog is a pet project of mine and i made it over a span of two days using HTML , CSS , Bootstrap , EJS , NodeJS and MongoDB Atlas. Hope you guys enjoy the beautiful UI and the Stunning Content (I hope).";
const aboutContent = "Um. I didn't program this route xD. Okay quick , diss a drab definition of a blog from google. Quickly.       A blog (shortening of “weblog”) is an online journal or informational website displaying information in the reverse chronological order, with the latest posts appearing first. It is a platform where a writer or even a group of writers share their views on an individual subject.";
const contactContent = "Looks like you don't know how this works. Noone is supposed to check these parts of the website. Besides , I contact you if i want to. That's how it works :)";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Mongoose connection and Schema
mongoose.connect("mongodb+srv://admin-rob:abcd1234@cluster0-ruks6.mongodb.net/blogDB", {useNewUrlParser: true,useUnifiedTopology:true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


//Express Routing

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
 
  })
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
