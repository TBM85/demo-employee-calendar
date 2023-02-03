import "./App.scss";
import employees from "./data/employees.json";
import calendar from "./data/calendar.json"
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>employee calendar</h1>
      </header>
      <main className="App-main">
        <Table employees={employees.data} calendar={calendar.datos} />
      </main>
    </div>
  );
}

export default App;
