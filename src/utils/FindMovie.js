export default function findMovie(movies, name) {
  return [...movies].filter((movie) =>
    movie.nameRU.toLowerCase().includes(name.toLowerCase())
  );
}
