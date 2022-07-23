const ShortMovieDuration = 40;

export default function findShort(movies) {
  return movies.filter((movie) => movie.duration <= ShortMovieDuration);
}
