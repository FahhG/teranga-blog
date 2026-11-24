
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { API_URL } from "../constants.js";

import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

function Favoris() {
  // Récupération des favoris depuis LayoutPrincipal
  const { favoris, onBasculerFavori } = useOutletContext();

  // État pour stocker tous les articles
  const [articles, setArticles] = useState([]);

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération des articles depuis l'API
  useEffect(() => {
    async function chargerArticles() {
      try {
        setChargement(true);
        setErreur(null);

        const reponse = await fetch(`${API_URL}/posts`);

        if (!reponse.ok) {
          throw new Error("Impossible de récupérer les articles.");
        }

        const donnees = await reponse.json();
        setArticles(donnees);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    }

    chargerArticles();
  }, []);

  // Garder uniquement les articles présents dans les favoris
  const articlesFavoris = articles.filter((article) =>
    favoris.includes(article.id)
  );

  return (
    <main className="page-favoris">
      <section className="entete-page">
        <h1>Mes favoris</h1>
        <p>Retrouvez ici tous les articles que vous avez aimés.</p>
      </section>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {articlesFavoris.length === 0 ? (
          <p className="discret">
            Vous n'avez pas encore ajouté d'articles à vos favoris.
          </p>
        ) : (
          <ListeArticles
            articles={articlesFavoris}
            favoris={favoris}
            onBasculerFavori={onBasculerFavori}
          />
        )}
      </EtatRequete>
    </main>
  );
}

export default Favoris;
