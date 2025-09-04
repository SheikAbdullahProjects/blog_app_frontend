import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ProfilePage from './pages/ProfilePage'
import useAuthStore from './store/useAuthStore'
import BlogDetail from './components/BlogDetail'
import BlogCreate from './pages/BlogCreate'
import MyBlogs from './pages/MyBlogs'
import Footer from './components/Footer'
import BlogUpdate from './pages/BlogUpdate'
import PublishBlogs from './pages/PublishBlogs'

const App = () => {
  const { authUser, check_auth, isUserLoading } = useAuthStore();
  React.useEffect(() => {
    check_auth();
  }, [check_auth]);
  console.log(authUser);


  if (isUserLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
        <Route path='/create' element={authUser ? <BlogCreate /> : <Navigate to="/signin" />} />
        <Route path="/about" element={authUser ? <About /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/signin" element={authUser ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="/update/:id" element={authUser ? <BlogUpdate /> : <Navigate to="/signin" />} />
        <Route path="/blog/:id" element={authUser ? <BlogDetail /> : <Navigate to="/signin" />} />
        <Route path="/my-blogs" element={authUser ? <MyBlogs /> : <Navigate to="/signin" />} />
        <Route path="/publish" element={authUser && authUser.is_admin ? <PublishBlogs /> : <Navigate to="/signin" />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App