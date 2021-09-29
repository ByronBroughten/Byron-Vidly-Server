const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");
const moment = require("moment");
const _ = require("lodash");

async function populate() {
  await initializeGenres();
  await initializeMovies();
}

const genreNames = {
  action: "Action",
  comedy: "Comedy",
  horror: "Horror",
  drama: "Drama",
  romance: "Romance",
};

async function initializeGenres() {
  await Genre.deleteMany();
  const genres = Object.values(genreNames);
  for (const genreName of genres) {
    const genre = new Genre({ name: genreName });
    await genre.save();
  }
}

async function initializeMovies() {
  await Movie.deleteMany();
  const movieParams = [
    ["The Shining", genreNames.horror],
    ["Titanic", genreNames.romance],
    ["Star Wars: Episode IV", genreNames.action],
    ["Jurassic Park", genreNames.action],
    ["Jaws", genreNames.horror],
    ["Elf", genreNames.comedy],
    ["Beauty and the Beast", genreNames.romance],
    ["The Avengers", genreNames.action],
    ["Shrek", genreNames.comedy],
    ["Pirates of the Caribbean", genreNames.action],
    ["The Exorcist", genreNames.horror],
    ["The Godfather", genreNames.drama],
    ["The Ten Commandments", genreNames.drama],
    ["Planes, Trains and Automobiles", genreNames.comedy],
    ["The Dark Night", genreNames.action],
    ["Brokeback Mountain", genreNames.romance],
    ["The Notebook", genreNames.romance],
    ["Ace Ventura: Pet Detective", genreNames.comedy],
  ];

  for (const movieParam of movieParams) {
    const [title, genreName] = movieParam;
    const genre = await Genre.findOne({ name: genreName });
    const movie = new Movie({
      title,
      genre: {
        _id: genre._id,
        name: genreName,
      },
      numberInStock: randomIntFromInterval(1, 10),
      dailyRentalRate: randomIntFromInterval(1, 3),
      publishDate: moment().toJSON(),
    });
    await movie.save();
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = populate;
