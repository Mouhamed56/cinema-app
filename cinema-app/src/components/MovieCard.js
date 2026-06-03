import React from 'react';
import { Card, Badge } from 'react-bootstrap';

// ===== HOOK : pas d'état local ici, composant pur d'affichage =====
function MovieCard({ titre, description, posterURL, note }) {

  // Couleur du badge selon la note
  const badgeColor = note >= 8 ? 'success' : note >= 5 ? 'warning' : 'danger';

  // Étoiles selon la note
  const etoiles = '⭐'.repeat(Math.round(note / 2));

  return (
    <Card style={styles.card}>
      <div style={styles.imageWrapper}>
        <Card.Img
          variant="top"
          src={posterURL}
          alt={titre}
          style={styles.image}
          onError={e => { e.target.src = 'https://via.placeholder.com/300x420?text=Pas+d%27image'; }}
        />
        {/* Badge note en overlay */}
        <Badge bg={badgeColor} style={styles.badge}>
          ⭐ {note}/10
        </Badge>
      </div>

      <Card.Body style={styles.body}>
        <Card.Title style={styles.titre}>{titre}</Card.Title>
        <div style={styles.etoiles}>{etoiles}</div>
        <Card.Text style={styles.description}>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MovieCard.defaultProps = {
  titre: 'Titre inconnu',
  description: 'Aucune description disponible.',
  posterURL: 'https://via.placeholder.com/300x420?text=Film',
  note: 0
};

const styles = {
  card: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    border: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    height: '100%',
    backgroundColor: '#1e1e2e'
  },
  imageWrapper: {
    position: 'relative'
  },
  image: {
    height: '320px',
    objectFit: 'cover',
    objectPosition: 'top'
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '0.85rem',
    padding: '6px 10px',
    borderRadius: '20px'
  },
  body: {
    backgroundColor: '#1e1e2e',
    padding: '15px'
  },
  titre: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '4px'
  },
  etoiles: {
    fontSize: '0.8rem',
    marginBottom: '8px'
  },
  description: {
    color: '#aaa',
    fontSize: '0.85rem',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }
};

export default MovieCard;
