import { Routes, Route } from 'react-router';
import { HomeScreen } from './pages/HomeScreen';
import { BookScreen } from './pages/BookScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/books/:id" element={<BookScreen />} />
    </Routes>
  );
}

export default App;
