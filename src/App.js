import "./App.css";
import { Header } from "./components/Header";
// import { Map } from "./components/Map";
import { MyMap } from "./components/Map";

function App() {
  return (
    <div className="App">
      <Header />
      <MyMap />
    </div>
  );
}

export default App;
