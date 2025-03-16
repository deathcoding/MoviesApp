export default function imgUrl(imgPath) {
  if (imgPath === null) {
    return "/img/Z2000128438.jpg";
  } else {
    return "https://image.tmdb.org/t/p/w500/" + imgPath;
  }
}
