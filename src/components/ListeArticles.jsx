
import ArticleCard from "./ArticleCard";

// Affiche une liste de cartes d'articles
function ListeArticles({ articles, favoris, onBasculerFavori }) {

  // Vérifier si la liste est vide
  if (articles.length === 0) {
    return <p className="discret">Aucun article disponible.</p>;
  }

  return (
    <div className="liste-articles">

      {articles.map((article) => {

        // Vérifier si l'article actuel est dans les favoris
        const estFavori = favoris.includes(article.id);

        return (
          <ArticleCard
            key={article.id}
            article={article}
            estFavori={estFavori}
            onBasculerFavori={onBasculerFavori}
          />
        );
      })}

    </div>
  );
}

export default ListeArticles;
