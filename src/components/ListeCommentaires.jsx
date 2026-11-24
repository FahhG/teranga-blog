
function ListeCommentaires({ commentaires }) {
  // Vérifier si le tableau est vide
  if (commentaires.length === 0) {
    return (
      <p className="discret">
        Aucun commentaire pour le moment.
      </p>
    );
  }

  return (
    <section className="liste-commentaires">
      <h3>Commentaires ({commentaires.length})</h3>

      {commentaires.map((commentaire) => (
        <article
          className="carte-commentaire"
          key={commentaire.id}
        >
          <h4>{commentaire.name}</h4>

          <p>{commentaire.body}</p>
        </article>
      ))}
    </section>
  );
}

export default ListeCommentaires;
