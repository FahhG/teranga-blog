
function EtatRequete({ chargement, erreur, children }) {

  // Première situation : les données sont en cours de chargement
  if (chargement) {
    return (
      <p className="etat-chargement">
        Chargement des données...
      </p>
    );
  }

  // Deuxième situation : une erreur est survenue
  if (erreur) {
    return (
      <p className="etat-erreur">
        {erreur}
      </p>
    );
  }

  // Troisième situation : afficher le contenu
  return children;
}

export default EtatRequete;
