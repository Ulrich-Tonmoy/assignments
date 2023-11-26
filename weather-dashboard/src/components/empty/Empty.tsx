import "./Empty.css";

const Empty = () => {
  return (
    <div className="empty-container">
      <img src={"icons/unknown.png"} className="icon-small" alt="weather" />
      <p>No Data found!</p>
      <p>Search For a new location</p>
    </div>
  );
};

export default Empty;
