"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { Img } from "react-image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState("1")
  const cardRef = useRef(null)

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

  let imageUrl = "https://via.placeholder.com/300x200?text=No+Image"
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

  const price = Number.parseFloat(product.price || "0").toFixed(2)

  // hover effect
  useEffect(() => {
    const curRef = cardRef.current
    if (!curRef) return

    const onEnter = () => {
        gsap.to(curRef, { scale: 1.2, duration: 0.15, ease: "power2.out" })
    }
    const onLeave = () => {
        gsap.to(curRef, { scale: 1, duration: 0.15, ease: "power2.inOut" })
    }

    curRef.addEventListener("mouseenter", onEnter)
    curRef.addEventListener("mouseleave", onLeave)

    return () => {
        curRef.removeEventListener("mouseenter", onEnter)
        curRef.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <Card ref={cardRef} className="overflow-hidden h-full flex flex-col transition-transform">
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
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
        <h3 className="font-semibold text-lg mb-1">{product.name || "Product Name"}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description || "No description available."}</p>
        <p className="text-lg font-bold">${price}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        {product.hasQuantity === "1" && (
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              {quantityOptions.map((qty) => (
                <SelectItem key={qty} value={qty}>
                  {qty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
