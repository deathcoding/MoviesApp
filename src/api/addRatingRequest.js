import axios from "axios";

//Func which send a request to rate the film, and add rate for our state in App.jsx, so as not to lose the rate when we switching filters
export default function addRatingRequest(
  rating,
  addRating,
  movieId,
  idAuthorization,
) {
  const options = {
    method: "POST",
    url: `https://api.themoviedb.org/3/movie/${movieId}/rating`,
    params: { guest_session_id: idAuthorization },
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
    },
    data: { value: rating },
  };
  axios
    .request(options)
    .then((res) => {
      console.log("Добавление рейтинга:", res.data.status_message);
      addRating(movieId, rating);
    })
    .catch((err) => console.error(err));
}
