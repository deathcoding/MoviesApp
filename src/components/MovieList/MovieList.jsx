import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList() {
  return (
    <section className="movie-list">
      <MovieCard className="moviecard"></MovieCard>
      <MovieCard className="moviecard"></MovieCard>
      <MovieCard className="moviecard"></MovieCard>
      <MovieCard className="moviecard"></MovieCard>
      <MovieCard className="moviecard"></MovieCard>
      <MovieCard className="moviecard"></MovieCard>
    </section>
  );
}
