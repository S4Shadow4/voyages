const mysql= require("mysql2");
const dataBase= mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "voyages"
});

dataBase.connect((error)=>{
    if (error) throw error 
    console.log("database connected successfully"); 
});
module.exports= dataBase;