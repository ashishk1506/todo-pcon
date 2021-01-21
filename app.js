const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = process.env.PORT||3000;
const bodyParser = require('body-parser')

//ejs engine used
app.set("view engine",'ejs')

app.use(bodyParser.urlencoded({extended:true}))

//connection with database
var db = mysql.createConnection({
    host:"b65k2v5eq5hpygsbmyhm-mysql.services.clever-cloud.com",
    port:'3306',
    user:"u1hql9occut1cyai",
    password:"kqeSj0Rc7xBCDdo7L5FL",
    database:"b65k2v5eq5hpygsbmyhm"
})

db.connect((e)=>{
    if(e)
    console.log(e)
    else
    console.log("conneted")
})


app.get('/',(req,res)=>{
    var sql1 = "SELECT * FROM helena"
    db.query(sql1,(err,result)=>
    {
        if(err) throw err;
        else
        res.render('index',{listItem:result})
    })
})

//to add a list
app.post('/add',(req,res)=>{
    var data = req.body.n;
    var sql = `INSERT INTO helena (name) VALUES ('${data}')`;
    db.query(sql, (err, result)=>
    {
      if (err) throw err;
      else
      res.redirect('/')
    })
})

// to delete a list by its id
app.post('/delete/:id',(req,res)=>{
    var id = req.params.id
    sql3="DELETE FROM helena WHERE id = ?"
    db.query(sql3,[id],(err,result)=>
    {
      if(err) throw err;
      else
      res.redirect('/')
    })
})

//to update a list by its id
app.post('/update/:id',(req,res)=>{
    var id = req.params.id
    var updatedItem = req.body.data
    sql4= `UPDATE helena SET name =?  WHERE id = ${id} `
    db.query(sql4,[updatedItem],(err,result)=>
    {
      if(err) throw err;
      else
      res.redirect('/')
    })
})



app.listen(PORT,()=>{ console.log(`connecting to server ${PORT}`)});