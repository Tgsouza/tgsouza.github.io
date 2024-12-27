import express from "express";
import bodyParser from "body-parser";
import QueryString from "qs";

const app = express();
const port = 3000;

//Static login temporary
const userName = "admin";
const passWord = "123";
var userNameLogin;
var passwordLogin;
let validLogin;

//Post creation variables;
var date = new Date();
var postTitle;
var postContent;
var postsArray = [{
    "title": "The Origins and Evolution",
    "content": "Cruzeiro's journey began under the name 'Sociedade Esportiva Palestra Itália', a reflection of the Italian community that formed the club. However, during World War II, political circumstances led to a name change, and in 1942, the club officially adopted the name Cruzeiro Esporte Clube, inspired by the Southern Cross constellation, a powerful symbol in Brazilian culture.",
    "date" : date.toString(),
    "author" : "Thiago"
},
{
    "title": "Golden Eras and Titles",
    "content": "Cruzeiro rose to national prominence in the 1960s and 1970s, a period often referred to as the club's golden era. The arrival of legendary players like Tostão, Dirceu Lopes, and Piazza propelled the team to its first major triumph—the 1966 Taça Brasil, Brazil’s premier national competition at the time. Cruzeiro’s victory over Santos, led by Pelé, marked the beginning of the club's dominance in Brazilian football. The club continued to shine on the international stage, winning its first Copa Libertadores in 1976. Cruzeiro cemented its reputation as a powerhouse by securing a second Libertadores title in 1997, under the leadership of Paulo Autuori. Domestically, Cruzeiro has enjoyed immense success, winning multiple Brasileirão Série A titles, Copa do Brasil trophies, and Campeonato Mineiro championships, further solidifying its status as one of Brazil's top football institutions.",
    "date" : date.toString(),
    "author" : "Thiago"
},
{
    "title": "Iconic Players and Legends",
    "content": "Over the decades, Cruzeiro has been home to some of the greatest footballers in Brazilian history. Tostão, Ronaldo Nazário (Ronaldo Fenômeno), Alex, and Sorín are just a few of the legendary figures who have donned the blue jersey. Their skill, flair, and leadership on the pitch have contributed to the club’s illustrious history.",
    "date" : date.toString(),
    "author" : "Thiago"
}];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//HOME PAGE GET
app.get("/", (req, res)=>{
    res.render("index.ejs", {
        posts: postsArray
    });
})

//GET POSTS PAGE 
app.get("/posts", (req, res) =>{
    res.render("posts.ejs", {
        posts: postsArray
    });
})

//SIGN-IN POST FORM ON ADMIN PAGE
app.post("/sign-in", (req, res) =>{
    userNameLogin = req.body.username;
    passwordLogin = req.body.password;

    if(userNameLogin === userName && passwordLogin === passWord){
        validLogin = true;
        res.render("admin.ejs");
    }else{
        validLogin = false;
        console.log("Access Denied!");
        res.render("login.ejs");
    }

})

//ADMIN PAGE
app.get("/admin", (req, res)=>{
    if(validLogin === true){
        res.render("admin.ejs")
    }else{
        res.render("login.ejs")
    }
})

// //MIDDLEWARE FOR POST CREATION ON ADMIN PAGE
// function postCreation(req, res, next){
//     postTitle = req.body.title;
//     postContent = req.body.content;
//     next();
// }
// app.use(postCreation);

//POST CREATION FORM ON ADMIN PAGE
//USING A REDIRECT RESPONSE WITH QUERYSTRING TO SEND THE POST, THIS PREVENTS THE USER FROM REFRESHING THE POST REQUEST AND GENERATING MORE ARTICLES WITH NO NEED.
app.post("/send-post", (req, res) =>{
    date = new Date();
    var newPost = {
        "title": req.body.title,
        "content": req.body.content,
        "date" : date.toString(),
        "author": "Thiago"
    }
    postsArray.unshift(newPost);
    res.redirect("/posts?" + QueryString.stringify({
        posts: postsArray
    }))
})

//SIGN-OUT POST FUNCTION ON ADMIN PAGE
app.post("/sign-out", (req, res) =>{
    userNameLogin = "";
    passwordLogin = "";
    validLogin = false;
    res.render("index.ejs", {
        posts: postsArray
    })
})

app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`)
})


