import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var entries = [
  {
    id: 1,
    title: "The Art of Self Preservation",
    content:
      "Boundaries are not just lines drawn to separate us from external pressures; they are lifelines that safeguard our well-being in the realm of EDI work. Belonging to a marginalized community means our experiences are deeply intertwined with our identities. It is crucial to define and communicate our boundaries clearly, both with ourselves and with those around us.",
    author: "Julio",
    date: "December 1st, 2024",
  },
  {
    id: 2,
    title: "Is 90125 really a Yes album?",
    content:
      "90125 is the secret word required to return to the present day from 1983 in Jeb Wright's Blast From the Past. That's just one of the classic rock connections in this delightfully funny new novel.",
    author: "Julio",
    date: "January 5th, 2025",
  },
  {
    id: 3,
    title: "Fast cars are a dying breed",
    content:
      "A few days ago, I had the opportunity to drive a high performance European sports car with its naturally aspirated engine generating 450 HP under the hood. A car that is highly responsive to the driver’s commands and is a sheer driving pleasure. Yet with all its driving pleasure and beauty I see this and similar cars as a dying breed. Not because these are not wonderful cars, but because of the paradigm shift that self-driving and electric cars are creating.",
    author: "Julio",
    date: "January 15th, 2025",
  },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blog: entries.toReversed() });
});

app.get("/create", (req, res) => {
  res.render("post.ejs");
});

app.post("/create", (req, res) => {
  let { title, content } = req.body;
  let id = getNextId();
  let author = "Julio";
  let date = new Date();
  let newEntry = { id, title, content, author, date };
  
  console.log(newEntry);
  entries.push(newEntry);

  res.redirect("/");
});

function getNextId() {
  var lastEntry, nextId;
  
  if (entries.length > 0) {
    lastEntry = entries[entries.length - 1];
    nextId = lastEntry.id + 1;
  } else {
    nextId = 1;
  }

  return nextId;
}

app.get("/edit/:id", (req, res) => {
  let target = entries.findIndex((e) => e.id == req.params.id);
  let entry = entries[target];

  res.render("edit.ejs", { post: entry });
});

app.post("/edit/:id", (req, res) => {
  let target = entries.findIndex((e) => e.id == req.params.id);
  let entry = entries[target];

  entry.title = req.body.title;
  entry.content = req.body.content;

  console.log(entry);

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let target = entries.findIndex((e) => e.id == req.params.id);
  entries.splice(target, 1);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on Port ${port}.`);
});
