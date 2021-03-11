import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '@/components/Rating';

function Book({ book }) {
  return (
    <Card className="p-3 h-100 rounded">
      <Link to={`/book/${book.objectId}`}>
        <Card.Img src={book.cover.url} />
      </Link>
      <Card.Body>
        <Link to={`/book/${book.objectId}`}>
          <Card.Title as="div">
            <p>
              <strong>{book.name}</strong>
            </p>
            <p>
              <small>{book.edition}</small>
            </p>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={book.totalRatings / book.numRatings}
              text={`${book.totalRatings} reviews`}
              color={'#f8e825'}
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;
