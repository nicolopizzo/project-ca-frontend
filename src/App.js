import "./App.css";
import { Container } from "./components/Container";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App" id="main">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossorigin=""
      />
      {/* <Header /> */}
      <Container />
    </div>
  );
}

export default App;
