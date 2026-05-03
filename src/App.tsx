import { Routes, Route } from 'react-router';
import { HomeScreen } from './pages/HomeScreen';
import { BookScreen } from './pages/BookScreen';
import { Header } from './components/Header';
import { SettingsScreen } from './pages/SettingsScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/books/:id" element={<BookScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </>
  );
}

export default App;
