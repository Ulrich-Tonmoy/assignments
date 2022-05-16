import data from "../data.json";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

export default function NewsDetails() {
    const { id } = useParams();
    const [news, setNews] = useState();

    useEffect(() => {
        data.forEach((item) => {
            if (item.id === id) {
                setNews(item);
            }
        });
    }, [id]);

    return news ? (
        <div className="news-details__container">
            <h2 className="news-details-title">{news.title}</h2>
            <h5 className="news-details-subtitle">{news.subtitle}</h5>
            <p className="news-details__time">
                <ReactTimeAgo date={news.time} timeStyle="twitter-first-minute" locale="en-US" />
            </p>
            <div className="news-details__content">
                <img src={news.photo} alt="" />
                <p className="news-details__desc">{news.description}</p>
            </div>
        </div>
    ) : (
        <>Loading</>
    );
}
