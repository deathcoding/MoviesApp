import { Card } from "antd";
import { Tag } from "antd";
import { Rate } from "antd";

import img from "../../movie_img.png";
import "./MovieCard.css";

export default function MovieCard() {
  return (
    <Card className="movie_card">
      <div className="card">
        <img src={img} className="movie_image" alt="Poster" />
        <div className="description">
          <div className="header">
            <h5 className="title">The way back</h5>
            <span className="date">March 5, 2020 </span>
            <ul className="tags">
              <li>
                <Tag>Action</Tag>
              </li>
              <li>
                <Tag>Drama</Tag>
              </li>
            </ul>
          </div>
          <p className="text">
            A former basketball all-star, who has lost his wife and family
            foundation in a struggle with addiction attempts to regain his soul
            and salvation by becoming the coach of a disparate ethnically mixed
            high ...
          </p>
          <Rate className="rate" allowHalf defaultValue={2.5} count={10} />
        </div>
      </div>
    </Card>
  );
}
