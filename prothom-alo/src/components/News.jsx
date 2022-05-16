import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

export default function News({ id, title, subtitle, img, description, time }) {
    return (
        <div className="news__container">
            <div className="news__content">
                <Link to={`/prothom-alo/news/${id}`} className="news__headline">
                    <h3 className="news__headline-title">
                        {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                    </h3>
                    <h5 className="news__headline-subtitle">{subtitle}</h5>
                </Link>
                <Link to={`/prothom-alo/news/${id}`}>
                    <img src={img} alt="" />
                </Link>
            </div>
            <Link to={`/prothom-alo/news/${id}`}>
                <p className="news__desc">
                    {description.length > 30 ? `${description.substring(0, 110)}...` : description}
                </p>
            </Link>
            <p className="news__time">
                <ReactTimeAgo date={time} locale="en-US" />
            </p>
        </div>
    );
}
