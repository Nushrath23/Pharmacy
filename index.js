const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nush@1023',
    database: 'pharmacy'
})

connection.connect()

// -------------------Customer---------------------------
// to display all customers
app.get('/Customers/ViewCustomer', (req, res) => {
    connection.query('select * from customer', (err, rows, fields) => {
        if (err) throw err
      
       res.send(rows)
      })
}) 


// to add a new customer
app.post('/Customers/AddCustomer', (req, res) => {
    connection.query('insert into customer values(?,?,?,?,?,?)',[req.body.CusId,req.body.Name,req.body.Address,req.body.Age,req.body.PhoneNo,req.body.is_deleted],(err,rows)=>{
        if (err) throw err
    
       res.send(rows)
      
      })
   
})

// to soft delete a customer
app.delete('/Customers/SoftDel', (req, res) => {
    connection.query('update customer SET is_deleted = 1 WHERE CusId = (?)',[req.body.CusId],(err,rows)=>{
    if (err) throw err
       res.send("Soft delete is handled succesfully")
    })
})


//to delete a customer
app.delete('/Customers/DeleteCustomer', (req, res) => {
    connection.query('delete FROM customer WHERE CusId = (?) ',[req.body.CusId],(err,rows)=>{
    if (err) throw err
    
       res.send("Deleted succesfully")
    })
})


// to update the customer
app.put('/Customers/EditCustomer', (req, res) => {
    connection.query(' update Customer SET Name = (?),Address = (?),Age = (?), PhoneNo = (?),is_deleted=(?) WHERE CusId = (?) ',[req.body.Name,req.body.Address,req.body.Age,req.body.PhoneNo,req.body.is_deleted,req.body.CusId],(err,rows)=>{
        if (err) throw err
        
           res.send("Customer Updated")
        })
})


// --------------------Medicines-----------------------

// to display all medicines
app.get('/Medicines/ViewMed', (req, res) => {
    connection.query('select * from Medicines', (err, rows, fields) => {
        if (err) throw err
      
       res.send(rows)
      })
}) 


// to add a new medicine
app.post('/Medicines/AddMed', (req, res) => {
    connection.query('insert into  Medicines values(?,?,?,?,?,?)',[req.body.MedId,req.body.MedName,req.body.Description,req.body.Quantity,req.body.UnitPrice,req.body.is_deleted],(err,rows)=>{
        if (err) throw err
    
       res.send(req.body.rows)
      })
   
})

// to soft delete a medicine
app.delete('/Medicines/SoftDel', (req, res) => {
    connection.query('update Medicines SET is_deleted = 1 WHERE MedId = (?)',[req.body.MedId],(err,rows)=>{
    if (err) throw err
       res.send("Soft delete is handled succesfully")
    })
})

// to delete a medicine
app.delete('/Medicines/DelMed', (req, res) =>{
    connection.query('delete FROM Medicines WHERE MedId = (?) ',[req.body.MedId],(err,rows)=>{
    if (err) throw err
    
       res.send("Deleted succesfully")
    })
})

//to update a medicine
app.put('/Medicines/UpdateMed', (req, res) => {
    connection.query(' update Medicines SET MedName = (?),Description = (?),Quantity = (?), UnitPrice = (?),is_deleted=(?) WHERE MedId = (?) ',[req.body.MedName,req.body.Description,req.body.Quantity,req.body.UnitPrice,req.body.is_deleted,req.body.MedId],(err,rows)=>{
        if (err) throw err
        
           res.send("Medicine Updated")
        })
})

// -------------------------Users-----------------------
// to display allUsers
app.get('/Users/ViewUser', (req, res) => {
    connection.query('select * from users', (err, rows, fields) => {
        if (err) throw err
      
       res.send(rows)
      })
}) 


// to add a new user
app.post('/User/NewUser', (req, res) => {
    connection.query('insert into  users values(?,?,?,?,?)',[req.body.Userid,req.body.Name,req.body.UserName,req.body.Password,req.body.Role],(err,rows)=>{
        if (err) throw err
    
       res.send(rows)
      })
   
})

// to delete a user
app.delete('/User/DelUser', (req, res) => {
    connection.query('delete FROM users WHERE Userid = (?) ',[req.body.Userid],(err,rows)=>{
    if (err) throw err
    
       res.send("Deleted succesfully")
    })
})

//to Update User 
app.put('/User/UpdateUser', (req, res) =>  {
    connection.query(' update users SET Name = (?),UserName = (?),Password = (?), Role = (?) WHERE Userid=(?) ',[req.body.Name,req.body.UserName,req.body.Password,req.body.Role,req.body.Userid],(err,rows)=>{
        if (err) throw err
           res.send("Customer Updated")
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})