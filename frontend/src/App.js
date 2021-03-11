import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container className="px-0">
          <Route path="/" component={HomePage} exact />
          <Route path="/book/:id" component={BookPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
