import HomePage from './pages/HomePage';
import UploadVideoPage from './pages/UploadVideoPage';
import ListVideosPage from './pages/ListVideosPage';
import UpdateVideoPage from './pages/UpdateVideoPage';
import ListEventsPage from './pages/ListEventsPage';
import CreateEventPage from './pages/CreateEventPage';
import ViewEventPage from './pages/ViewEventPage';
import UpdateEventPage from './pages/UpdateEventPage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';


function App() {

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Movie Site Example</a>
            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/videos">Videos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/screenings">Screenings</a>
                </li>

              </ul>

            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/screenings/create" exact={true}>
            <CreateEventPage />
          </Route>
          <Route path="/screenings" exact={true}>
            <ListEventsPage />
          </Route>
          <Route path="/screenings/view/:id" exact={true}>
            <ViewEventPage />
          </Route>
          <Route path="/screenings/update/:id" exact={true}>
            <UpdateEventPage />
          </Route>
          <Route path="/videos" exact={true}>
            <ListVideosPage />
          </Route>
          <Route path="/videos/update/:id" exact={true}>
            <UpdateVideoPage />
          </Route>
          <Route path="/upload" exact={true}>
            <UploadVideoPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;
