import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Posts from './pages/Posts'
import About from './pages/About'
import NotFound from './pages/NotFound'
import PostDetail from './pages/PostDetail'
import './App.css'

function App() {
  // Global user state (defaults to "Lance")
  const [currentUser, setCurrentUser] = useState("Lance");

  return (
    <div className="app">

      {/* Pass user state to Header so it displays "Logged in as: Lance" */}
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <main className="container">

        <Routes>

          <Route
            path="/"
            element={<Home currentUser={currentUser} />}
          />

          <Route
            path="/posts"
            element={<Posts currentUser={currentUser} />}
          />

          <Route
            path="/posts/:postId"
            element={<PostDetail currentUser={currentUser} />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  )
}

export default App