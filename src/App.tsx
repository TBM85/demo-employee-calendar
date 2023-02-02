import "./App.scss";
import employees from "./data/employees.json";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>employee calendar</h1>
      </header>
      <Table employees={employees.data} />
    </div>
  );
}

export default App;
