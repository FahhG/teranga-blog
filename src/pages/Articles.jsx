
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { API_URL } from "../constants.js";

import BarreRecherche from "../components/BarreRecherche";
import ListeArticles from "../components/ListeArticles";
import EtatRequete from "../components/EtatRequete";

function Articles() {
  // État pour stocker les articles récupérés depuis l'API
  const [articles, setArticles] = useState([]);

  // Texte saisi dans la barre de recherche
  const [valeur, setValeur] = useState("");

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération des favoris depuis LayoutPrincipal
  const { favoris, onBasculerFavori } = useOutletContext();

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

  // Filtrage des articles selon le titre recherché
  const articlesFiltres = articles.filter((article) =>
    article.title.toLowerCase().includes(valeur.trim().toLowerCase())
  );

  return (
    <main className="page-articles">
      <section className="entete-page">
        <h1>Tous les articles</h1>
        <p>
          Découvrez tous les articles et recherchez ceux qui vous intéressent.
        </p>
      </section>

      <BarreRecherche
        valeur={valeur}
        onChangement={setValeur}
      />

      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesFiltres}
          favoris={favoris}
          onBasculerFavori={onBasculerFavori}
        />
      </EtatRequete>
    </main>
  );
}

export default Articles;
