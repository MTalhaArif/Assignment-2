const Blogs= require('../models/blogs');

const blogIndex= (req, res)=>
{
    Blogs.find().sort({createdAt: -1})
    .then((result)=>
    {
        res.render('index',{title: 'All Blogs',blogs: result });

    })
    .catch((err)=>{console.log(err)});
}

const blogDetails =(req,res)=>
{
    const id= req.params.id;
    Blogs.findById(id)
    .then((result) =>
        {
            res.render('details', {blogs : result , title : 'Blogs Details'});
        })
        .catch((err)=>{console.log(err)});
}

const blogCreate_get =(req,res)=>
{
    res.render('create',{ title: 'Create Blog'});
}

const blogCreate_post =(req,res)=>
{
    const blog= new Blogs(req.body);
    blog.save()
    .then((result)=>
    {
        res.redirect('/');
    })
    .catch((err)=>{console.log(err)});
}

const blogDelete =(req,res)=>
{
    const id= req.params.id; 
    Blogs.findByIdAndDelete(id)
    .then((result)=>
    {
        res.json({redirect: '/'})
    })
    .catch((err)=>{console.log(err)});
}





module.exports= {

    blogIndex,
    blogDetails,
    blogCreate_get,
    blogCreate_post,
    blogDelete
};