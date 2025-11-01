import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT  || 1212;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API = "https://test.icorp.uz/interview.php"
const myUrl = "https://nonmimetic-hellen-morbidly.ngrok-free.dev/callback"

const msg = "ICORP000!"
let first = null
let second = null

if (!myUrl) {
  console.error("ERROR: MY_URL environment variable is not set!");
}

app.get("/", (req, res) => {
  res.send("Hello Woorld!");
});

app.post("/callback", async (req, res) => {
  try {
    second = req.body.part2;;
    res.json({ message: "PART 2 ni oldim" });
  } catch (error) {
    console.error("Error >>>>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

})


app.listen(PORT,  async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    console.log("Url >>>>", myUrl);
    const postResponse = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({msg: msg, url: myUrl})
    })

    const postAtvet = await postResponse.json()
    first = postAtvet.part1;
  } catch (error) {
    console.error("Error >>>>", error);
  }

   if (first && second) {
      let all = first + second;
      console.log("2 ta part >>> ", all);
      
      const getRes = await fetch(`${API}?code=${encodeURIComponent(all)}`);
      const getResJson = await getRes.json();
      console.log("NATIJA >>>>", getResJson);
    }else{
      console.log("Part 1 or Part 2 yo'q");
    }

});


