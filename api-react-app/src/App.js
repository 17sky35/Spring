import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MultiButtons from './MultiButtons';
import Address from './api/Address';
import BookSearch from './api/BookSearch';
import NewsSearch from './api/NewsSearch';
import MyMap from './api/Map';
import MyMap2 from './api/Map2';
import MyMap3 from './api/Map3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MultiButtons />} />
          <Route path="/address" element={<Address />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/newsSearch" element={<NewsSearch />} />
          <Route path="/map" element={<MyMap />} />
          <Route path="/map2" element={<MyMap2 />} />
          <Route path="/map3" element={<MyMap3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
