const express = require("express");
const fetch = require("node-fetch");
const books = require("./books.json");

const key = `KGXBPKnyuYSnSpYDYo7rA`;
const goodReadsURL = `https://www.goodreads.com`;

const app = express();
const port = process.env.PORT || 3001;

async function getGoodReadsRatingsByIsbn(isbn) {
  try {
    const response = await fetch(
      `${goodReadsURL}/book/review_counts.json?key=${key}&isbns[]=${isbn}`
    );
    const data = await response.json();
    const ratings = data.books[0];
    return ratings;
  } catch (error) {
    return {
      ratings_count: 0,
      reviews_count: 0,
    };
  }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/books", (req, res) => {
  if (!books.results) {
    return res.json({ results: [] });
  }

  return res.json(books);
});

app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = books.results.find((b) => b.objectId === id);

    if (!book) {
      return res.status(404).json({ message: `Book ${id} was not found` });
    }

    const ratings = await getGoodReadsRatingsByIsbn(book.isbn);

    return res.json({
      ...book,
      goodreads: {
        numRatings: ratings.ratings_count,
        totalRatings: ratings.reviews_count,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(port, function () {
  console.log(`Server listening at http://localhost:${port}/`);
});
