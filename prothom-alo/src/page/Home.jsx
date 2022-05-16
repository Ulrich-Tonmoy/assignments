import News from "../components/News";
import news from "../data.json";

export default function Home() {
    return (
        <div className="home__container">
            {news.map((item) => (
                <News
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    img={item.photo}
                    description={item.description}
                    time={item.time}
                />
            ))}
        </div>
    );
}
