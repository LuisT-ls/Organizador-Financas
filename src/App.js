import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ExpensesPage from './components/ExpensesPage'
import IncomePage from './components/IncomePage'
import SavingsPage from './components/SavingsPage'
import FixedCostsPage from './components/FixedCostsPage'
import LeisureExpensesPage from './components/LeisureExpensesPage'
import EmergencyFund from './components/EmergencyFund'
import Login from './Login'
import Register from './Register'
import { AuthProvider, useAuth } from './auth'
import { GlobalStateProvider } from './context/GlobalState'
import './styles/App.css'

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth()
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />
}

const Layout = ({ children }) => {
  const location = useLocation()
  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/register'
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        {!isAuthRoute && <Sidebar />}
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStateProvider>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <ProtectedRoute element={Dashboard} />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/expenses"
              element={
                <Layout>
                  <ProtectedRoute element={ExpensesPage} />
                </Layout>
              }
            />
            <Route
              path="/income"
              element={
                <Layout>
                  <ProtectedRoute element={IncomePage} />
                </Layout>
              }
            />
            <Route
              path="/savings"
              element={
                <Layout>
                  <ProtectedRoute element={SavingsPage} />
                </Layout>
              }
            />
            <Route
              path="/fixed-costs"
              element={
                <Layout>
                  <ProtectedRoute element={FixedCostsPage} />
                </Layout>
              }
            />
            <Route
              path="/leisure-expenses"
              element={
                <Layout>
                  <ProtectedRoute element={LeisureExpensesPage} />
                </Layout>
              }
            />
            <Route
              path="/emergency-fund"
              element={
                <Layout>
                  <ProtectedRoute element={EmergencyFund} />
                </Layout>
              }
            />
          </Routes>
        </GlobalStateProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
