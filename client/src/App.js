import './App.css';
import { Router } from '@reach/router';
import AllProducts from './components/AllProducts';
import Details from './components/Details';
import Edit from './components/Edit';


function App() {
  return (
    <div className="App">
      <h1>Product Manager</h1>
      <Router>
        <AllProducts default path="/products" />
        <Details path="/products/:id" />
        <Edit path="/products/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
