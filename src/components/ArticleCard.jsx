
import { Link } from "react-router";

// Carte d'un article
function ArticleCard({ article, estFavori, onBasculerFavori }) {
  return (
    <article className="carte-article">

      <div className="carte-article-contenu">
        <h2>{article.title}</h2>

        <p>{article.body}</p>

        <Link to={`/articles/${article.id}`}>
          Lire l'article
        </Link>
      </div>

      <button
        type="button"
        onClick={() => onBasculerFavori(article)}
      >
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

    </article>
  );
}

export default ArticleCard;
