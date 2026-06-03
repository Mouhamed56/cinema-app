import React, { useState } from 'react';
import { Container, Button, Modal, Form, Row, Col, Navbar, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

// ===== DONNÉES INITIALES =====
const filmsInitiaux = [
  {
    id: 1,
    titre: "Inception",
    description: "Un voleur qui s'infiltre dans les rêves des gens pour leur voler des secrets se voit offrir une chance de rédemption.",
    posterURL: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    note: 9
  },
  {
    id: 2,
    titre: "Interstellar",
    description: "Une équipe d'explorateurs voyage à travers un trou de ver découvert près de Saturne pour assurer la survie de l'humanité.",
    posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    note: 9
  },
  {
    id: 3,
    titre: "The Dark Knight",
    description: "Batman affronte le Joker, un criminel anarchique qui veut plonger Gotham City dans le chaos.",
    posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    note: 10
  },
  {
    id: 4,
    titre: "Parasite",
    description: "La famille Ki-taek, sans le sou, s'introduit progressivement dans la vie d'une famille riche.",
    posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    note: 8
  },
  {
    id: 5,
    titre: "Spider-Man: No Way Home",
    description: "Peter Parker demande à Doctor Strange de faire oublier son identité secrète, déclenchant des conséquences multiverselles.",
    posterURL: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    note: 8
  },
  {
    id: 6,
    titre: "Avatar",
    description: "Un marine paraplégique est envoyé sur la lune Pandora où il tombe amoureux d'une Na'vi.",
    posterURL: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    note: 7
  }
];

function App() {
  // ===== HOOKS useState =====
  const [films, setFilms] = useState(filmsInitiaux);
  const [recherche, setRecherche] = useState('');
  const [noteMin, setNoteMin] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // État du formulaire d'ajout
  const [nouveauFilm, setNouveauFilm] = useState({
    titre: '',
    description: '',
    posterURL: '',
    note: 5
  });

  // ===== FILTRE avec useMemo implicite via recalcul =====
  const filmsFiltres = films.filter(film => {
    const titreMatch = film.titre.toLowerCase().includes(recherche.toLowerCase());
    const noteMatch = film.note >= noteMin;
    return titreMatch && noteMatch;
  });

  // ===== AJOUTER UN FILM =====
  const handleAjouter = () => {
    if (!nouveauFilm.titre.trim()) return;

    const film = {
      id: Date.now(),
      titre: nouveauFilm.titre,
      description: nouveauFilm.description || 'Aucune description.',
      posterURL: nouveauFilm.posterURL || 'https://via.placeholder.com/300x420?text=' + encodeURIComponent(nouveauFilm.titre),
      note: Number(nouveauFilm.note)
    };

    setFilms(prev => [film, ...prev]);
    setNouveauFilm({ titre: '', description: '', posterURL: '', note: 5 });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouveauFilm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ backgroundColor: '#12121f', minHeight: '100vh' }}>

      {/* ===== NAVBAR ===== */}
      <Navbar style={{ backgroundColor: '#0d0d1a', borderBottom: '2px solid #e94560' }}>
        <Container>
          <Navbar.Brand style={{ color: '#e94560', fontWeight: 'bold', fontSize: '1.5rem' }}>
            🎬 CinémaApp
          </Navbar.Brand>
          <Badge bg="secondary" style={{ fontSize: '0.9rem', padding: '8px 14px' }}>
            {filmsFiltres.length} film{filmsFiltres.length > 1 ? 's' : ''}
          </Badge>
        </Container>
      </Navbar>

      <Container className="py-5">

        {/* ===== EN-TÊTE ===== */}
        <div className="text-center mb-5">
          <h1 style={{ color: '#fff', fontWeight: 'bold' }}>Mes Films Préférés</h1>
          <p style={{ color: '#888' }}>Découvrez, filtrez et ajoutez vos films favoris</p>
          <Button
            style={{
              backgroundColor: '#e94560', border: 'none',
              borderRadius: '50px', padding: '12px 30px',
              fontWeight: 'bold', fontSize: '1rem'
            }}
            onClick={() => setShowModal(true)}
          >
            ➕ Ajouter un Film
          </Button>
        </div>

        {/* ===== FILTRE ===== */}
        <Filter
          recherche={recherche}
          setRecherche={setRecherche}
          noteMin={noteMin}
          setNoteMin={setNoteMin}
        />

        {/* ===== LISTE DES FILMS ===== */}
        <MovieList films={filmsFiltres} />

      </Container>

      {/* ===== MODAL AJOUT FILM ===== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#1e1e2e', borderBottom: '1px solid #333' }}
        >
          <Modal.Title style={{ color: '#fff' }}>🎬 Ajouter un Film</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#1e1e2e' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ccc' }}>Titre *</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                placeholder="Ex: Inception"
                value={nouveauFilm.titre}
                onChange={handleChange}
                style={{ backgroundColor: '#2a2a3e', border: '1px solid #444', color: '#fff' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ccc' }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Décrivez le film..."
                value={nouveauFilm.description}
                onChange={handleChange}
                style={{ backgroundColor: '#2a2a3e', border: '1px solid #444', color: '#fff' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ccc' }}>URL de l'affiche</Form.Label>
              <Form.Control
                type="text"
                name="posterURL"
                placeholder="https://..."
                value={nouveauFilm.posterURL}
                onChange={handleChange}
                style={{ backgroundColor: '#2a2a3e', border: '1px solid #444', color: '#fff' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ccc' }}>
                Note : <strong style={{ color: '#e94560' }}>{nouveauFilm.note}/10</strong>
              </Form.Label>
              <Form.Range
                min={0} max={10} step={1}
                name="note"
                value={nouveauFilm.note}
                onChange={handleChange}
                style={{ accentColor: '#e94560' }}
              />
              <Row>
                <Col style={{ color: '#888', fontSize: '0.75rem' }}>0</Col>
                <Col className="text-center" style={{ color: '#888', fontSize: '0.75rem' }}>5</Col>
                <Col className="text-end" style={{ color: '#888', fontSize: '0.75rem' }}>10</Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: '#1e1e2e', borderTop: '1px solid #333' }}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ borderRadius: '50px' }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleAjouter}
            disabled={!nouveauFilm.titre.trim()}
            style={{
              backgroundColor: '#e94560', border: 'none',
              borderRadius: '50px', fontWeight: 'bold'
            }}
          >
            ✅ Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
