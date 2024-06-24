const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", async function (req, res) {
  try {
    const password = "qwert";
    const hashedPassword = "$2a$10$JMCtUrOcFjvZQz2ELO3N5eo2sn9Jy7mMPSckYyzodhL0qEu/I/CFu";

    // Compare the provided password with the hashed password
    const result = await bcrypt.compare(password, hashedPassword);
    console.log(result);

    // Send a response based on the result of the comparison
    res.send(result ? "Password matched!" : "Password did not match!");
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
