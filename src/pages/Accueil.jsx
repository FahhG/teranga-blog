
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { API_URL } from "../constants.js";

import ListeArticles from "../components/ListeArticles";
import EtatRequete from "../components/EtatRequete";

function Accueil() {
  // État pour stocker les articles
  const [articles, setArticles] = useState([]);

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération des favoris depuis LayoutPrincipal
  const { favoris, onBasculerFavori } = useOutletContext();

  // Récupération des six premiers articles depuis l'API
  useEffect(() => {
    async function chargerArticles() {
      try {
        setChargement(true);
        setErreur(null);

        const reponse = await fetch(`${API_URL}/posts?_limit=6`);

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

  return (
    <main className="page-accueil">
      <section className="presentation">
        <h1>Bienvenue sur Teranga Blog</h1>

        <p>
          Découvrez des articles, partagez vos idées et échangez
          avec notre communauté.
        </p>

        <p>
          Teranga Blog est un espace de partage et de découverte
          autour de différents sujets.
        </p>
      </section>

      <section className="derniers-articles">
        <h2>Les derniers articles</h2>

        <EtatRequete chargement={chargement} erreur={erreur}>
          <ListeArticles
            articles={articles}
            favoris={favoris}
            onBasculerFavori={onBasculerFavori}
          />
        </EtatRequete>
      </section>
    </main>
  );
}

export default Accueil;
