const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port = 8000;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFY STUFF
app.use(express.static('public'))
app.use('/public',express.static('public'))   // for serving static files
app.use(express.urlencoded('index.js')) //this uses to help to get the data to express

// PUG SPECIFIC STUFF
app.set("view engine",'pug')   // set the templete engine as pug
app.set('views', path.join(__dirname, 'views'))   // set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const params = {  }
    // res.status(200).render('index.pug',params); 
    res.status(200).render('home.pug',params); 

})
app.get('/contact',(req,res)=>{
    const params = {  }
    // res.status(200).render('index.pug',params); 
    res.status(200).render('contact.pug',params); 
})

app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the data base")
    }).catch(()=>{
        res.status(400).send('item was not save to the data base')
    })

    // res.status(200).render('contact.pug'); 
})

// START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})
