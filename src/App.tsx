import './App.css';
import { Routes, Route } from 'react-router';
import { BookList } from './pages/BookList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList/>}/>
    </Routes>
  );
}

export default App;
