const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.js')
const cors = require("cors")
const PORT = 8081;
const CORS_ORIGIN = "http://localhost:3000";


app.use(express.static("public"))
app.use(cors({origin:CORS_ORIGIN}));
app.use(express.json())
app.use('/blogs', blogRouter);
app.listen(PORT, ()=>{
    console.log("server up")
})