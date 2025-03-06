const express = require("express")
const app = express();
app.set("view engine", "ejs")
app.use(express.json());

app.get("/",(req,res) =>{
    res.render("index")
})

app.listen(3001, (req, res) => {
    console.log("Si corre en el puerto 3000")
})

