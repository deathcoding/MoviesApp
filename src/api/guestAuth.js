import axios from "axios";

export default function guestAuth(setIsAuthorized, setIdAuthorization) {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/authentication/guest_session/new",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
    },
  };
  axios
    .request(options)
    .then((res) => {
      setIsAuthorized(true);
      setIdAuthorization(res.data.guest_session_id);
    })
    .catch((err) => console.error(err));
}
