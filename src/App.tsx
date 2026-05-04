import { Switch, Route } from "wouter";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import GoalDetailPage from "./pages/GoalDetail/GoalDetailPage";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/goals/:id" component={GoalDetailPage} />
    </Switch>
  );
}

export default App;
