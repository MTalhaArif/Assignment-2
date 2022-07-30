const express= require('express');
const mongoose=require('mongoose');

const Blogs= require('./models/blogs')
//creating express app 
const app=express();

//connect to mongo db
const dbU= 'mongodb+srv://talhaarif31:test1234@cluster0.pysqe.mongodb.net/firstprod?retryWrites=true&w=majority';
mongoose.connect(dbU, {useNewUrlParser : true, useUnifiedTopology : true })
.then((result)=>app.listen(3000))
.catch((err)=> console.log(err));
//morgan builit in middleware
const morgan= require('morgan');
const { result } = require('lodash');
//register view engine

app.set('view engine', 'ejs');
//listen to a request
//app.listen(3000);

//middleware static files
app.use(express.static('public'));

app.use(express.urlencoded({extended : true})); //to get data from the fields or text boxes

app.use(morgan('dev'));

//Mongoose and mongo sandbox routes

// app.get('/add-blog', (req,res)=>
// {
// const blog= new Blogs({
//     title: 'new blog2',
//     snippet:'about my new blog',
//     body: 'More about my new blog'
// });

// blog.save()
// .then((result)=>{
//     res.send(result)
// })
// .catch((err)=>{console.log(err)});
// });
// //get blogs
// app.get('/all-blogs', (req,res)=>
// {
//     Blogs.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{console.log(err);});
// });

// //single blog
// app.get('/single-blog', (req,res)=>
// {
//     Blogs.findById('62e286cdecea464657da03eb')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{console.log(err);});
// });



// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
//   });
//   app.use((req, res, next) => {
//     console.log('next middleware');
  
//     next();
//   });
app.get('/',(req, res)=>{
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    res.redirect('/blogs');

  //  res.sendFile('./views/index.html',{root : __dirname})    //no need to use setheader now nor status code

  //using views
 // res.render('index',{ title: 'home', blogs });
})
app.get('/about',(req, res)=>{

    //res.sendFile('./views/about.html',{root : __dirname})    //no need to use setheader now nor status code
    res.render('about',{ title: 'about'});

})

//blog routes

//get request handler

app.get('/blogs',(req,res)=>
{
    Blogs.find().sort({createdAt: -1})
    .then((result)=>
    {
        res.render('index',{title: 'All Blogs',blogs: result });

    })
    .catch((err)=>{console.log(err)});
});

app.get('/blogs/create',(req, res)=>{

    res.render('create',{ title: 'Create Blog'});
});


//post request handler
app.post('/blogs',(req,res)=>
{
    const blog= new Blogs(req.body);
    blog.save()
    .then((result)=>
    {
        res.redirect('/blogs');
    })
    .catch((err)=>{console.log(err)});

});

app.get('/blogs/:id', (req, res)=>
{
    const id= req.params.id;
    Blogs.findById(id)
    .then((result) =>
        {
            res.render('details', {blogs : result , title : 'Blogs Details'});
        })
        .catch((err)=>{console.log(err)});
});

//delete request

app.delete('/blogs/:id', (req, res)=>
{
    const id= req.params.id; 
    Blogs.findByIdAndDelete(id)
    .then((result)=>
    {
        res.json({redirect: '/blogs'})
    })
    .catch((err)=>{console.log(err)});
});


//404
app.use((req, res)=>
{
    //res.sendFile('./views/404.html',{root : __dirname})
    res.status(404).render('404',{ title: '404'});

});