import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import api from '@/services/api';

function BookPage({ match }) {
  const [book, setBook] = useState({});

  useEffect(() => {
    (async () => {
      const id = match.params.id;
      const response = await api.get(`/books/${id}`);

      setBook(response.data);
    })();
  }, [match.params.id]);

  return (
    !!Object.keys(book).length && (
      <div>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Row>
          <Col md={4}>
            <Image src={book.cover.url} alt={book.name} fluid />
          </Col>
          <Col md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{book.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Author(a): {book.author}</ListGroup.Item>
              <ListGroup.Item>Mês/Ano: {book.edition}</ListGroup.Item>
              <ListGroup.Item>Curador(a): {book.curator}</ListGroup.Item>
              <ListGroup.Item>Número de páginas: {book.pages}</ListGroup.Item>
              <ListGroup.Item>
                Total de avaliações TAG: {book.totalRatings}
              </ListGroup.Item>
              <ListGroup.Item>
                Total de avaliações GoodReads: {book.goodreads.totalRatings}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  );
}

export default BookPage;
