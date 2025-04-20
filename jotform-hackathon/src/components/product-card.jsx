import { useState,useRef } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Img } from "react-image"
import { ShoppingCart } from "lucide-react"
import { useBasket } from "../context/basket-context"
import { useToast } from "./ui/use-toast"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Incrementer } from "./incrementer"

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState("1")
  const { addToBasket } = useBasket()
  const { toast } = useToast()
  const cardRef = useRef(null)
  const selectRef = useRef(null)

  // Parse options if they exist
  let quantityOptions = ["1"]
  try {
    if (product.options) {
      const options = JSON.parse(product.options)
      const quantityOption = options.find((opt) => opt.type === "quantity")
      if (quantityOption && quantityOption.properties) {
        quantityOptions = quantityOption.properties.split("\n").filter(Boolean)
      }
    }
  } catch (error) {
    console.error("Error parsing options:", error)
  }

  // Parse images
  let imageUrl = "https://via.placeholder.com/200"
  try {
    if (product.images) {
      const images = JSON.parse(product.images)
      if (images.length > 0 && images[0]) {
        imageUrl = images[0]
      }
    }
  } catch (error) {
    console.error("Error parsing images:", error)
  }

  // Format price
  const price = Number.parseFloat(product.price || "0").toFixed(2)

  const handleAddToBasket = () => {
    addToBasket(product, quantity)
    toast({
      variant: "success",
      title: "Added to basket",
      
      description: `${product.name} (Qty: ${quantity}) has been added to your basket.`,
      duration: 2000,
    })
  }

  useGSAP(() => {
      const cur = cardRef.current
      const select = selectRef.current
      if (!cur) return

      const onEnter = () => {
        gsap.to(cur, { scale: 1.2, duration: 0.3, ease: "power2.out" })
      }
      const onLeave = () => {
        gsap.to(cur, { scale: 1, duration: 0.3, ease: "power2.inOut" })
      }

      cur.addEventListener("pointerenter", onEnter)
      cur.addEventListener("pointerleave", onLeave)


      return () => {
        cur.removeEventListener("pointerenter", onEnter)
        cur.removeEventListener("pointerleave", onLeave)
      }
    }, [])

    const handleQuantityChange = (value) => {
      console.log("Selected quantity in parent:", value)
      setQuantity(value)
    }
    

  return (
    <Card className="overflow-hidden h-full flex flex-col" ref={cardRef}>
      <div className="relative h-48 bg-gray-100">
        <Img
          className="object-contain p-2 h-full w-full"
          src={imageUrl}
          loader={
            <div className="flex items-center justify-center h-full w-full">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 animate-spin rounded-full" />
            </div>
          }
          unloader={
            <img
              src="https://via.placeholder.com/300x200?text=No+Image"
              className="h-full w-full object-contain p-2"
            />
          }
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <p className="text-lg font-bold">${price}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">

          <Incrementer onChange={handleQuantityChange} ></Incrementer>
        <Button className="w-full" onClick={handleAddToBasket}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Basket
        </Button>
      </CardFooter>
    </Card>
  )
}
