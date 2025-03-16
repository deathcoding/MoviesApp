import "./MovieCard.css";
import { Card, Tag, Rate, ConfigProvider } from "antd";
import formatOverviewText from "../../utils/formatOverviewText";
import imgUrl from "../../utils/imageUrl";
import formatDate from "../../utils/formatDate";

export default function MovieCard({ name, text, rate, date, imgPath }) {
  const imageForCard = imgUrl(imgPath);
  const dateForCard = formatDate(date);
  const textForCard = formatOverviewText(text, 150);

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
      <Card className="movie_card">
        <div className="card">
          <img src={imageForCard} className="movie_image" alt="Poster" />
          <div className="description">
            <div className="header">
              <span className="title">
                <h5 className="title_text">{name}</h5>
                <span className="rate_circle">{rate.toFixed(1)}</span>
              </span>
              <span className="date">{dateForCard}</span>
              <ul className="tags">
                <li>
                  <Tag>Action</Tag>
                </li>
                <li>
                  <Tag>Drama</Tag>
                </li>
              </ul>
            </div>
            <div className="content">
              <p className="text">{textForCard}</p>
            </div>
            <div className="footer">
              <Rate className="rate" allowHalf defaultValue={rate} count={10} />
            </div>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
}
