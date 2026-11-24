
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";

import { API_URL } from "../constants.js";

import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

function Auteur() {
  // Récupération de l'identifiant depuis l'URL
  const { id } = useParams();

  // Récupération des favoris depuis LayoutPrincipal
  const { favoris, onBasculerFavori } = useOutletContext();

  // États pour stocker l'auteur et ses articles
  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération de l'auteur et de ses articles
  useEffect(() => {
    const controleur = new AbortController();

    async function chargerAuteur() {
      try {
        setChargement(true);
        setErreur(null);
        setAuteur(null);
        setArticles([]);

        // Récupération des informations de l'auteur
        const reponseAuteur = await fetch(
          `${API_URL}/users/${id}`,
          { signal: controleur.signal }
        );

        if (!reponseAuteur.ok) {
          throw new Error("Impossible de récupérer cet auteur.");
        }

        const donneesAuteur = await reponseAuteur.json();

        if (!donneesAuteur.id) {
          throw new Error("Auteur introuvable.");
        }

        // Récupération des articles de cet auteur
        const reponseArticles = await fetch(
          `${API_URL}/posts?userId=${id}`,
          { signal: controleur.signal }
        );

        if (!reponseArticles.ok) {
          throw new Error("Impossible de récupérer les articles de cet auteur.");
        }

        const donneesArticles = await reponseArticles.json();

        setAuteur(donneesAuteur);
        setArticles(donneesArticles);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErreur(error.message);
        }
      } finally {
        if (!controleur.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerAuteur();

    // Annuler les requêtes si l'identifiant change
    // ou si le composant est démonté
    return () => {
      controleur.abort();
    };
  }, [id]);

  return (
    <main className="page-auteur">
      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <>
            <section className="fiche-auteur">
              <h1>{auteur.name}</h1>

              <p>
                <strong>Nom d'utilisateur :</strong> {auteur.username}
              </p>

              <p>
                <strong>Email :</strong> {auteur.email}
              </p>

              <p>
                <strong>Téléphone :</strong> {auteur.phone}
              </p>

              <p>
                <strong>Ville :</strong> {auteur.address.city}
              </p>

              <p>
                <strong>Entreprise :</strong> {auteur.company.name}
              </p>
            </section>

            <section className="articles-auteur">
              <h2>Articles de {auteur.name}</h2>

              <ListeArticles
                articles={articles}
                favoris={favoris}
                onBasculerFavori={onBasculerFavori}
              />
            </section>
          </>
        )}
      </EtatRequete>
    </main>
  );
}

export default Auteur;
