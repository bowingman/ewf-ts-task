import { Genre, Movie } from "./index.types";
import db from "./db.json";

const getScore = (genres: Genre[], skills: string[]): Number => {
  return [...skills].reduce((score, skill, i, arr) => {
    const index = genres.indexOf(skill as Genre);
    if (index < 0) {
      arr.splice(1);
      return -1;
    }
    return score + 1;
  }, 0);
};

/*
Complexity O(n), n = db.movies.length
The worst case O(n * m) n = db.movies.length, m = genres.length
Algorithm Description
 1. Calculate the score from movie.genre and genre
 2. Sort the score and return array
*/

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if (genres.length === 0) {
    return [db.movies[Math.floor(Math.random() * db.movies.length)]];
  }
  return db.movies
    .reduce((result, movie) => {
      const score = getScore(genres, movie.genres);
      if (score === movie.genres.length) {
        result.push({
          movie: movie,
          score: score,
        });
      }
      return result;
    }, [] as { movie: Movie; score: Number }[])
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .map((movieWithScoreItem) => movieWithScoreItem.movie);
};
