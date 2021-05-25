import './App.css';
import MainPage from "./pages/MainPage"
import ReservationPage from "./pages/ReservationPage"
import CompleteReservationPage from "./pages/CompleteReservationPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage}/>       
          <Route path="/reserve" exact component={ReservationPage}/>       
          <Route path="/reserve/complete" component={CompleteReservationPage}/>       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
