import './App.css';

import MovieState from './context/MovieState';

import Alert from './components/Alert';
import Header from './components/Header';
import Results from './components/Results';
import Details from './components/Details';
import Nominations from './components/Nominations';

const App = () => {
  return (
    <MovieState>
      <div className="App">
        <Alert />
        <div className="container">
          <Header />
          <Results />
          <Details />
          <Nominations />
        </div>
      </div>
    </MovieState>
  );
};

export default App;
