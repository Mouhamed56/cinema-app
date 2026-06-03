import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

// ===== COMPOSANT FILTRE — reçoit les états et setters via props =====
function Filter({ recherche, setRecherche, noteMin, setNoteMin }) {
  return (
    <div style={styles.wrapper}>
      <h5 style={styles.titre}>🔍 Filtrer les films</h5>
      <Row className="g-3">

        {/* Filtre par titre */}
        <Col md={7}>
          <Form.Label style={styles.label}>Par titre</Form.Label>
          <InputGroup>
            <InputGroup.Text style={styles.inputIcon}>🎬</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Rechercher un film..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              style={styles.input}
            />
          </InputGroup>
        </Col>

        {/* Filtre par note minimale */}
        <Col md={5}>
          <Form.Label style={styles.label}>
            Note minimale : <strong style={{ color: '#e94560' }}>{noteMin}/10</strong>
          </Form.Label>
          <Form.Range
            min={0}
            max={10}
            step={1}
            value={noteMin}
            onChange={e => setNoteMin(Number(e.target.value))}
            style={{ accentColor: '#e94560' }}
          />
          <div style={styles.rangeLabels}>
            <span>0</span><span>5</span><span>10</span>
          </div>
        </Col>

      </Row>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#1e1e2e',
    borderRadius: '16px',
    padding: '20px 25px',
    marginBottom: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  titre: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderBottom: '2px solid #e94560',
    paddingBottom: '8px'
  },
  label: {
    color: '#ccc',
    fontSize: '0.9rem',
    marginBottom: '6px'
  },
  inputIcon: {
    backgroundColor: '#2a2a3e',
    border: '1px solid #444',
    color: '#fff'
  },
  input: {
    backgroundColor: '#2a2a3e',
    border: '1px solid #444',
    color: '#fff'
  },
  rangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#888',
    fontSize: '0.75rem',
    marginTop: '2px'
  }
};

export default Filter;
