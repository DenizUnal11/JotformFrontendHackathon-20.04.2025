import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


export function Incrementer({ onChange }) {
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (val) => {
    setQuantity(val)
    onChange?.(val) // call parent callback if provided
  }

  const handleIncrement = () => {
    updateQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Button type="button" onClick={handleDecrement}>-</Button>
      <Input
        type="number"
        value={quantity}
        readOnly
        className="text-center"
      />
      <Button type="button" onClick={handleIncrement}>+</Button>
    </div>
  )
}
