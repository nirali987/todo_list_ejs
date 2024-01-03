var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser')

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false })) 



var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_js",
});

con.connect();


app.get("/" , function(req,res){
    res.sendFile(__dirname + '/index.html')
    
});

app.get('/ejs' , function(req,res){

    var select_query = "select * from ejs_user";

    con.query(select_query , function(error,result,field){
        if(error) throw error;
        res.render("index",{result});
    })

});

app.post('/ejs' , function(req,res){

    
    var name = req.body.name;

    var insert_query = "insert into ejs_user(name)values('"+name+"')";

    con.query(insert_query , function(error,result,field){
        if(error) throw error;
        res.redirect("/ejs");
    })
});
app.post('/up/:id' , function(req,res){

    var id = req.body.id;
    var id = req.params.id;

    var name = req.body.name;

    var update_query = "update ejs_user set name = '"+name+"' where id = '"+id+"' ";

    console.log(id);

    con.query(update_query , function(error,result,field){
        if(error) throw error;
        res.redirect("/ejs");
    })
});


app.get('/delete/:id' , function(req,res){

    var id = req.params.id;

    var delete_query = "delete from ejs_user where id = " + id;

    con.query(delete_query , function(error,result,field){
        if(error) throw error;
        res.redirect('/ejs');
    })
});

app.get('/edit/:id' , function(req,res){
    var id  = req.params.id;

    var  edit_query = "select * from ejs_user where id = " +id; 

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.render("form",{result});
        
    })
});



app.listen(3000);