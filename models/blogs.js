const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//we first define a schema
const blogSchema=new Schema({
    title:{
        type : String,
        required : true
    },
    snippet:{
        type : String,
        required : true
    },
    body:{
        type : String,
        required : true
    }
},{timestamps: true});


//then we define a model based on that schema
const Blogs= mongoose.model('Blogs',blogSchema);

module.exports= Blogs;