// to create a Schema 

const mongoose=require('mongoose');
const contactSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
})

const Contact = mongoose.model('Contact',contactSchema);//this is to create the collections we want to store in DB
//exporting the collection in the main index.js file.
module.exports=Contact;