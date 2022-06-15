const express = require("express");
const { readdirSync, readFileSync } = require("fs");
const matter = require("gray-matter");
const CacheStore = require("./cache");
const cors = require("cors");
require("dotenv").config();

const store = new CacheStore();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    methods: ["GET"],
  })
);

const perPage = 12;

app.get("/api", (req, res) => {
  try {
    const query = req.query;
    const page = query.page;

    const skip = ((page || 1) - 1) * perPage;

    const temp = readdirSync("./posts").sort((a, b) => {
      if (a > b) return -1;
      else return 1;
    });

    const files = temp.slice(
      skip ? skip + 1 : 0,
      skip ? perPage + skip + 1 : perPage + skip
    );

    const posts = files.map((file) => {
      const { data, content } = matter(readFileSync(`./posts/${file}`));
      return { id: file, head: data, body: content };
    });

    const totalPage = Math.ceil(temp.length / perPage);

    res.json({ posts, totalPage });
  } catch (err) {
    res.json({ message: "error" });
  }
});

app.get("/api/search", (req, res) => {
  try {
    const query = req.query;
    const term = query.term;

    const page = query.page;
    const skip = ((page || 1) - 1) * perPage;

    let data = store.getData(term);

    if (!data) {
      const files = readdirSync("./posts");

      const postList = files
        .map((file) => {
          const { data, content } = matter(readFileSync(`./posts/${file}`));
          if (term.trim()) {
            if (content.includes(term) || data.category.includes(term)) {
              return { id: file, head: data, body: content };
            }
          } else {
            return { id: file, head: data, body: content };
          }
        })
        .filter((post) => post);
      data = store.getData(term, postList);
    }

    data.sort(({ id: a }, { id: b }) => {
      if (a > b) return -1;
      else return 1;
    });

    const posts = data.slice(
      skip ? skip + 1 : 0,
      skip ? perPage + skip + 1 : perPage + skip
    );

    let totalPage;
    if (term == "algo") {
      totalPage = Math.floor(data.length / perPage);
    } else {
      totalPage = Math.ceil(data.length / perPage);
    }
    res.json({ posts, totalPage });
  } catch (err) {
    console.log(err);
    res.json({ message: "error" });
  }
});

app.get("/api/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = readdirSync("./posts").find((file) => file === id);

    if (!result) {
      res.json({ message: "검색결과가 없습니다." });
      return;
    }

    const { data, content } = matter(readFileSync(`./posts/${result}`));
    const post = { id: result, head: data, body: content };

    res.json(post);
  } catch (err) {
    res.json({ message: "error" });
  }
});

app.listen(process.env.PORT, () => console.log("server is running"));
