const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());






app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
