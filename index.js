const express = require("express");
const app = express();

app.use(express.json());

// ---- Replace these with your details ----
const FULL_NAME = "john_doe"; // lowercase only
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concatChars = [];

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // Numeric check
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatChars.push(item);
      } else {
        special_characters.push(item);
      }
    });

    // Generate alternating caps reverse string
    let concat_string = concatChars
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

// For local testing
app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
