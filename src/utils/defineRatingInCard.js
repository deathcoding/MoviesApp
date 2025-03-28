export default function defineRatingInCard(ratings, rateStars, movieId) {
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

  return currentRating;
}
