import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useState } from 'react';

import { auth } from "./firebase/config";

import CardsList from "./components/CardsList";
import Card from "./components/Card";
import Proposals from "./components/Proposals";

import useFirestore from "./hooks/useFirestore";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setCurrentUser(user)
    } else {
      // User is signed out
      setCurrentUser(null)
    }
  });

  const signIn = () => {
    let provider = new auth.GoogleAuthProvider();

    auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        setCurrentUser(result);
      })
  }

  const signOut = () => {
    auth().signOut()
      .then(() => {
        setCurrentUser(null)
      })
  }

  const GetListItems = (collection) => {
    const { docs } = useFirestore(collection);
    const listItems = docs.map(item => <Card key={item.id} data={item} />);

    return listItems
  }

  // Proposals Content
  const proposalListItems = GetListItems("Proposals")
  const libraryListItems = GetListItems("Library")

  return (
    <Router>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-2 fixed-top">
        <div className="container">
          <h1 className="navbar-brand fs-1 my-auto text-info">USEMI</h1>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto fs-2">
              <li className="nav-item"><Link to="/" className="nav-link">Library</Link></li>
              <li className="nav-item"><Link to="/proposals" className="nav-link">Proposals</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
              {
                !!currentUser ?
                  (<li className="nav-item dropdown">
                    <p className="nav-link dropdown-toggle text-info mb-0" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                      {currentUser.displayName}
                    </p>
                    <ul className="dropdown-menu">
                      <li className="dropdown--item text-center">
                        <button className="btn btn-info" onClick={() => signOut()}>
                          <i className="bi bi-google"></i> SignOut
                        </button>
                      </li>
                    </ul>
                  </li>) :
                  (<li className="nav-item">
                    <button className="btn btn-info" onClick={() => signIn()}>
                      <i className="bi bi-google"></i> SignIn
                    </button>
                  </li>)
              }
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-5 p-2">
        <section className="mt-md-4 mx-1 p-1 fs-3">
          <Route path="/" exact>
            {<CardsList cardItems={libraryListItems} />}
          </Route>
          <Route path="/proposals">
            <Proposals user={currentUser} />
            <CardsList cardItems={proposalListItems} />
          </Route>
          <Route path="/about">
            <h2 className="mt-2 p-1 fs-2 text-center">
              This project is for helping students in my country learn better Swahili!
            </h2>
          </Route>
        </section>
      </main>
    </Router>
  );
}

export default App;
