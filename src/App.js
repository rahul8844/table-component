import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Analytics from "./page/Analytics";
import { SET_APPS } from "./redux/ActionType";
import { API_APP_URL } from "./utils/apiUrl";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./page/Home";

function App() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);

  const fetchApps = async () => {
    const res = await fetch(`${API_APP_URL}`);
    const results = await res.json();
    if (results.data) {
      dispatch({
        type: SET_APPS,
        apps: results.data,
      });
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <a href={'/analytics'}>Analytics</a>
        </nav>
        <Switch>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
