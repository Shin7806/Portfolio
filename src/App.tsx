import { Routes, Route } from 'react-router'
import PortfolioApp from './portfolio/PortfolioApp'
import ResumeApp from './resume/ResumeApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioApp />} />
      <Route path="/resume" element={<ResumeApp />} />
    </Routes>
  )
}
