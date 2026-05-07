import { Switch, Route, Router } from "wouter";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import GoalDetailPage from "./pages/GoalDetail/GoalDetailPage";

const base = "/savings-tracker-challenge";

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/goals/:id" component={GoalDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
