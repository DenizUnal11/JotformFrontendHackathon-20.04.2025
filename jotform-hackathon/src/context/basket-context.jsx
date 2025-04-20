import { createContext, useContext, useState } from "react"

const BasketContext = createContext(undefined)

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([])

  const addToBasket = (product, quantity) => {
    setBasketItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.pid === product.pid)

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity =
          Number.parseInt(updatedItems[existingItemIndex].quantity) + Number.parseInt(quantity)
        return updatedItems
      } else {
        return [...prevItems, { ...product, quantity: Number.parseInt(quantity) }]
      }
    })
  }

  const getUniqueItemCount = () => {
    return basketItems.length
  }

  const getBasketTotal = () => {
    return basketItems
      .reduce((total, item) => {
        return total + Number.parseFloat(item.price) * Number.parseInt(item.quantity)
      }, 0)
      .toFixed(2)
  }

  return (
    <BasketContext.Provider value={{ basketItems, addToBasket, getUniqueItemCount, getBasketTotal }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const context = useContext(BasketContext)
  return context
}