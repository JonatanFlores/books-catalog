import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Book from '@/components/Book';
import api from '@/services/api';
import { sortBooksByEdition } from './helpers';

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books').then((response) => {
      setBooks(sortBooksByEdition(response.data.results));
    });
  }, []);

  return (
    <div>
      <h1>Our Books</h1>
      <Row>
        {books.map((book) => (
          <Col
            key={book.objectId}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="py-3"
          >
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
