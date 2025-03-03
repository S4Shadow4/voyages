require("dotenv").config();

const userRoute= require("./routes/userRoute");
const addAnnonces = require("./routes/addAnnoncesRoute")
const paymentRoute = require("./routes/payementRoute");
const express = require("express");
const cors= require("cors");
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/files', express.static('files')); 

app.use("/user",userRoute);
app.use("/addAnnonces",addAnnonces);
app.use("/payment", paymentRoute);

app.listen( 5000 || process.env.PORT );