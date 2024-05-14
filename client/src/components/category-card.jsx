import "../styles/category-card.css"
import "../App.css";

// eslint-disable-next-line react/prop-types
function Card({ imageSrc, title, link }) {
  return (
    <a href={link} className="category-card txt-primary">
      <img className="cat-img"src={imageSrc} alt={title} />
      <div>{title}</div>
    </a>
  );
}

export default Card