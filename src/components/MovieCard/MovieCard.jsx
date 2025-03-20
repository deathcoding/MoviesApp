import "./MovieCard.css";
import { Card, Tag, Rate, ConfigProvider } from "antd";
import formatOverviewText from "../../utils/formatOverviewText";
import formatTitleText from "../../utils/formatTitleText";
import imgUrlPath from "../../utils/imageUrlPath";
import formatDate from "../../utils/formatDate";

export default function MovieCard({ name, text, rate, date, imgPath }) {
  const imageForCard = imgUrlPath(imgPath);
  const dateForCard = formatDate(date);
  const textOverviewForCard = formatOverviewText(text, 150);
  const textTitleForCard = formatTitleText(name, 60);

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
      <Card className="movie_card" style={{ minHeight: "281px" }}>
        <div className="card">
          <img src={imageForCard} className="movie_image" alt="Poster" />
          <div className="description">
            <div className="header">
              <span className="title">
                <h5 className="title_text">{textTitleForCard}</h5>
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
              <p className="text">{textOverviewForCard}</p>
            </div>
            <div className="footer">
              <Rate
                className="rate"
                allowHalf
                defaultValue={rate ? rate : 0}
                count={10}
              />
            </div>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
}
