import 'bootswatch/dist/litera/bootstrap.min.css';
import logo from './logo_ikea.jpg';

import Categories from './components/Categories';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, InMemoryCache } from '@apollo/react-hooks';
import Navbar from './components/shared/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container">
          <img src={logo} alt="MyIKEA logo" title="MyIKEA" style={{ width: 300, display: 'block', margin: 'auto' }} />
          <Categories />
        </div>
      </div>

    </ApolloProvider >
  );
}

export default App;
