import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar";
import CsvTable from "./components/CsvTable";
import ParseFile from "./components/ParseFile";

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <ParseFile />
      <CsvTable />
    </div>
  );
}

export default App;
