const express = require('express');
const app = express();// including the express library
const port = 8000;
//const fs = require("fs");
const path = require("path");
//including mongoose library
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true,useUnifiedTopology: true });
//including body parser
// const bodyparser= require("body-parser")



//Denfine mongoose
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

});
//model schema
var Contact = mongoose.model('Contact', ContactSchema);


// Express Stuff

app.use('/static', express.static('static')) // for serving static files
// /static is url and 'static' is folder

app.use(express.urlencoded()); // it is a middleware which will trnasfer the data to the specified file i.e output.txt mentioned below

// PUG STUFF
app.set('view engine', 'pug')//pug intilization
app.set('views', path.join(__dirname, 'views'))// views will be folder


app.get('/', (req, res) => {

    // const param={}
    // res.status(200).render('home.pug',param); //index.pug is file
    res.status(200).render('home.pug');
})
//get method
app.get('/contact', (req, res) => {

    
    res.status(200).render('contact.pug'); //contact.pug is file
})
//post methog
app.post('/contact', (req, res) => {

    var myData =  new Contact(req.body);//req.body basicly takes the post requst or data which is submitted by user and then give it myData and then we save our data and then show it later using promise and catch
    myData.save().then(() =>{
        res.send("This item has been saved to Db")
    }).catch(()=>{ // it is a method it deals with only rejected cases, so if thendoesn't work then catchwill
        res.status(400).send("Item was not saved")
    });
        // res.status(200).render('contact.pug', param); //contact.pug is file
})





//Start the server
app.listen(port, () => {
    console.log(`The applicated started on port ${port}`);
});