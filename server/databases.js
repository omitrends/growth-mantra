const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'amruta123',
  database: 'tables'
});

connection.connect(function(error){
  if(error){
    console.log(error);
    return;
  }
  else{
    var sql = "CREATE TABLE register(userid varchar(20) , email varchar(20))";
    connection.query(sql , (error , result)  => {
        if (error){
            console.log("error")
        }
        else{
            console.log("table created")
        }
    } )
  }
  console.log('Connection established sucessfully');
});

