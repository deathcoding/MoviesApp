export default function synchronizeRatingColor(rate) {
  if (rate < 3) {
    return "rate_circle red";
  } else if (rate > 3 && rate < 5) {
    return "rate_circle orange";
  } else if (rate > 5 && rate < 7) {
    return "rate_circle yellow";
  } else {
    return "rate_circle green";
  }
}
