import "../App.css";
import "../styles/search.css";

function Search() {
  return (
    <div className="txt-primary ft-primary s-card">
      <h2>Search</h2>
      <input
        type="text"
        className="ft-sec-reg txt-primary"
        placeholder={ "🔍 Search for products"}
      />
    </div>
  );
}

export default Search;
