import "./MovieCard.css";
import { Tag, Rate, ConfigProvider } from "antd";
import formatOverviewText from "../../utils/formatOverviewText";
import formatTitleText from "../../utils/formatTitleText";
import imgUrlPath from "../../utils/imageUrlPath";
import formatDate from "../../utils/formatDate";
import synchronizeRatingColor from "../../utils/synchronizeRatingColor";
import addRatingRequest from "../../api/addRatingRequest";
import { GenresContext } from "../../Contexts/GenresContext";
import { useContext } from "react";
import defineGenres from "../../utils/defineGenres";
import defineRatingInCard from "../../utils/defineRatinginCard";

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
  const allGenres = useContext(GenresContext);
  const ratingColor = synchronizeRatingColor(rate);
  const definedGenres = defineGenres(movieGenres, allGenres);
  const definedRating = defineRatingInCard(ratings, rateStars, movieId);
  let genresKey = 0;

  function handleRating(rating) {
    addRatingRequest(rating, addRating, movieId, idAuthorization);
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starSize: 15,
          },
        },
      }}
    >
      <div className="card">
        <img src={imageForCard} className="movie_image" alt="Poster" />
        <div className="description">
          <div className="header">
            <span className="title">
              <h5 className="title_text">{textTitleForCard}</h5>
              <span className={ratingColor}>{rate.toFixed(1)}</span>
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
              defaultValue={definedRating}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
