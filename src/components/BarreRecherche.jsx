
function BarreRecherche({ valeur, onChangement }) {
  return (
    <div className="barre-recherche">
      <label htmlFor="recherche-articles">
        Rechercher un article
      </label>

      <input
        type="text"
        id="recherche-articles"
        value={valeur}
        onChange={(e) => onChangement(e.target.value)}
        placeholder="Saisir le titre d'un article..."
      />
    </div>
  );
}

export default BarreRecherche;
