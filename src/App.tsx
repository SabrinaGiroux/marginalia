import { Routes, Route } from 'react-router';
import { HomeScreen } from './pages/HomeScreen';
import { BookScreen } from './pages/BookScreen';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/books/:id" element={<BookScreen />} />
      </Routes>
    </>
  );
}

export default App;
