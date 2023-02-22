const express = require("express");
const mysql = require("mysql2")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'movies_db'
    },
  );

app.get("/"), (req,res) => {
    res.send("homepage")
}

app.get("/api/movies", (req,res) => {
    db.query("SELECT * FROM movies", (err,data)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({msg:"error occurred",err:err})
        } else {
            res.json(data);
        }
    })
})

app.post("/api/movies", (req,res) => {
    db.query("INSERT INTO movies(title)VALUES(?)",[req.body.title], (err,data)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({msg:"error occurred",err:err})
        } else {
            res.json(data);
        }
    })
})
app.delete("/api/movies/:id", (req,res) => {
    db.query("DELETE FROM movies WHERE id = ?",[req.params.id], (err,data)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({msg:"error occurred",err:err})
        } else {
            res.json(data);
        }
    })
})

app.get("/api/reviews", (req,res) => {
    db.query("SELECT title AS film, body AS review FROM reviews JOIN movies ON movie_id=movies.id", (err,data)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({msg:"error occurred",err:err})
        } else {
            res.json(data);
        }
    })
})
app.put("/api/reviews/:id", (req,res) => {
    db.query("UPDATE reviews SET body=? WHERE id=?",[req.body.body,req.params.id], (err,data)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({msg:"error occurred",err:err})
        } else {
            res.json(data);
        }
    })
})

app.listen(PORT, function () {
    console.log("Listening in on PORT " + PORT);
});