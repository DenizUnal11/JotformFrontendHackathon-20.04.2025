import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import { BasketProvider } from "./context/basket-context"
import BasketIcon from "./components/basket-icon"
import Homepage from "./pages/homepage"
import PaymentPage from "./pages/paymentpage"

function App() {
  return (
    <BasketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <BasketIcon />
        <Toaster position="bottom-left"/>
      </Router>
    </BasketProvider>
  )
}

export default App