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
  return (
    <div className="app">

      <Header />

      <main className="container">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/posts"
            element={<Posts />}
          />

          <Route
            path="/posts/:postId"
            element={<PostDetail />}
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