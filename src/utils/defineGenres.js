export default function defineGenres(movieGenres, allGenres) {
  let definedGenres = [];

  movieGenres?.forEach((currentMovieGenreId) => {
    allGenres.forEach((movieGenreId) => {
      if (currentMovieGenreId === movieGenreId.id) {
        const genreForCurrentMovie = movieGenreId.name;
        definedGenres.push(genreForCurrentMovie);
      }
    });
  });

  return definedGenres;
}
