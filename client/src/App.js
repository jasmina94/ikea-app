import 'bootswatch/dist/litera/bootstrap.min.css';
import logo from './logo_ikea.jpg';
import Categories from './containers/Categories';
import Products from './containers/Products';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider, InMemoryCache } from '@apollo/react-hooks';
import Navbar from './components/shared/Navbar';
import ProductDetails from './components/ProductDetails';
import WorkingHours from './containers/WorkingHours';
import Support from './containers/Support';
import CheckAvailableProducts from './containers/CheckAvailableProducts';
import AdminPanel from './containers/AdminPanel';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div className="container">
            <img src={logo} alt="MyIKEA logo" title="MyIKEA" style={{ width: 300, display: 'block', margin: 'auto' }} />
            <Route exact path="/" component={Categories} />
            <Route exact path="/workingHours" component={WorkingHours} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/available" component={CheckAvailableProducts} />
            <Route exact path="/category/:categoryId/products" component={Products} />
            <Route exact path="/product-details/:productId" component={ProductDetails} />
          </div>
        </div>
      </Router>
    </ApolloProvider >
  );
}

export default App;
