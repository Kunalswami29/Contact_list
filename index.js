// calling the library for using the express
const express=require('express');

//setting the path
const path=require('path');

//defining the port;
const port =8000;

//calling th connection mongoose
const db= require('./config/mongoose');

//importing the collection from contactfile
const Contact=require('./models/contact');

const app=express(); //to basically run all the functionalities needed to run express file || firing the express server
 
//setting app the viewengine ejs
app.set('view engine','ejs');

//connecting the directory
app.set('views',path.join(__dirname,'views'));

//using middlewares to add or delete contact n static file on the serve
app.use(express.urlencoded());

// using middleware to fetch the static file like css n js
app.use(express.static('assets'));

//creating the contactlist for storing on ram purpose not mandatory using DB
var contactList=[
    {
        name:"kunal",
        phone:"6589432"
    },
    {
        name:"Govind",
        phone:"6589432"
    },
    {
        name:"Sakshi",
        phone:"6589432"
    }

] ;


// to add a contact from db;
app.get('/',function(req,res){
    // getting data from the databse
    Contact.find({},function(err,contacts){    //find is also the inbuilt function to find and perform
        if(err){
            console.log('error in fetching the contacts from db')
            return ;
        }
        return   res.render('home',{
            title:"Contact List",
            contact_list:contacts
        });

    });
  
});

// to basically creating a new contact on the server and storing it on DB
app.post('/create-contact',function(req,res){
    // contactList.push(req.body);

    Contact.create({                  //this is to check in the collection contact in DB
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });
});

// to delete a contact;

app.get('/delete-contact/',function(req,res){
    //get the id from the query in the ul
    let id=req.query.id;
    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){    //findById is inbuiltfunction in javascript to find and delete
        if(err){
            console.log('error in deleting object from DB')
            return;
        }
        return res.redirect('back') //open the server
    });
    
});

//to check once the server is setup working up or not
app.listen(port,function(err){
    if(err){
        console.log("Error has occurred",err);
    }
    console.log("yayy!! server is running up on port,",port);
})
