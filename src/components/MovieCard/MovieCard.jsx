import "./MovieCard.css";
import { Card, Tag, Rate, ConfigProvider } from "antd";
import formatOverviewText from "../../utils/formatOverviewText";
import formatTitleText from "../../utils/formatTitleText";
import imgUrlPath from "../../utils/imageUrlPath";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import { GenresContext } from "../../Contexts/GenresContext";
import { useContext } from "react";

export default function MovieCard({
  idAuthorization,
  movieId,
  name,
  text,
  rate,
  date,
  imgPath,
  rateStars,
  ratings,
  addRating,
  movieGenres,
}) {
  const imageForCard = imgUrlPath(imgPath);
  const dateForCard = formatDate(date);
  const textOverviewForCard = formatOverviewText(text, 150);
  const textTitleForCard = formatTitleText(name, 60);

  const genres = useContext(GenresContext);

  let definedGenres = [];

  movieGenres?.forEach((currentMovieGenre) => {
    genres.forEach((movieGenre) => {
      if (currentMovieGenre === movieGenre.id) {
        const genreForCurrentMovie = movieGenre.name;
        definedGenres.push(genreForCurrentMovie);
      }
    });
  });

  //Func which send a request to rate the film, and add rate for our state in App.jsx, so as not to lose the rate when we switching filters
  function handleRating(rating) {
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

  let currentRating = 0;
  for (const item of ratings) {
    if (item.movieId === movieId) {
      currentRating = item.rating;
      break;
    }
  }
  if (rateStars && currentRating === 0) {
    currentRating = rateStars;
  }

  let synchronizedRatingColor;

  if (rate < 3) {
    synchronizedRatingColor = "rate_circle red";
  } else if (rate > 3 && rate < 5) {
    synchronizedRatingColor = "rate_circle orange";
  } else if (rate > 5 && rate < 7) {
    synchronizedRatingColor = "rate_circle yellow";
  } else {
    synchronizedRatingColor = "rate_circle green";
  }

  let genresKey = 0;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            bodyPadding: 0,
          },
          Rate: {
            starSize: 15,
          },
        },
      }}
    >
      {/* <Card className="movie_card" style={{ minHeight: "281px" }}> */}
      <div className="card">
        <img src={imageForCard} className="movie_image" alt="Poster" />
        <div className="description">
          <div className="header">
            <span className="title">
              <h5 className="title_text">{textTitleForCard}</h5>
              <span className={synchronizedRatingColor}>{rate.toFixed(1)}</span>
            </span>
            <span className="date">{dateForCard}</span>
            <ul className="tags">
              {definedGenres.length > 0 ? (
                definedGenres.map((genre) => {
                  return (
                    <li key={genresKey++}>
                      <Tag>{genre}</Tag>
                    </li>
                  );
                })
              ) : (
                <Tag>No genres found</Tag>
              )}
            </ul>
          </div>
          <div className="content">
            <p className="text">{textOverviewForCard}</p>
          </div>
          <div className="footer">
            <Rate
              className="rate"
              allowHalf
              onChange={handleRating}
              count={10}
              defaultValue={currentRating}
            />
          </div>
        </div>
      </div>
      {/* </Card> */}
    </ConfigProvider>
  );
}
