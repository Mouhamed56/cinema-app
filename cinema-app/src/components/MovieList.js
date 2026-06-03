import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

// ===== COMPOSANT MOVIELIST =====
function MovieList({ films }) {

  if (films.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>🎬 Aucun film trouvé...</p>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          Essayez de modifier vos filtres ou ajoutez un nouveau film.
        </p>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {films.map(film => (
        <Col key={film.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard
            titre={film.titre}
            description={film.description}
            posterURL={film.posterURL}
            note={film.note}
          />
        </Col>
      ))}
    </Row>
  );
}

const styles = {
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#1e1e2e',
    borderRadius: '16px',
    marginTop: '20px'
  },
  emptyText: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '10px'
  }
};

export default MovieList;
