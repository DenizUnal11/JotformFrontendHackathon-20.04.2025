import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"

export default function FilterBar({ products, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [maxPrice, setMaxPrice] = useState(100)

  // Set max price on load
  useEffect(() => {
    if (products.length > 0) {
      const highestPrice = Math.max(...products.map((p) => parseFloat(p.price || "0")))
      setMaxPrice(Math.ceil(highestPrice))
      setPriceRange([0, Math.ceil(highestPrice)])
    }
  }, [products])

  // Apply filters
  useEffect(() => {
    onFilterChange({
      searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }, [searchTerm, priceRange])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, maxPrice])
    onFilterChange({
      searchTerm: "",
      minPrice: 0,
      maxPrice,
    })
  }

  return (
    <div className="mb-6 flex justify-center py-6 bg-background shadow-sm -muted-foreground">
      <div className="w-full max-w-5xl space-y-4 fixed">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Search Input */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Filter toggle on mobile */}
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>

          {/* Desktop Price Range */}
          <div className="hidden md:flex items-center gap-4 w-full max-w-lg">
            <div className="flex items-center gap-2 flex-grow">
              <label className="text-sm font-medium whitespace-nowrap">
                Price: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                min={0}
                max={maxPrice}
                step={1}
                onValueChange={handlePriceChange}
                className="w-full"
                thumbClassName="bg-primary h-4 w-4 rounded-full"
              />
            </div>

            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm whitespace-nowrap">
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterOpen && (
          <div className="md:hidden mt-4 p-4 border rounded-md bg-background shadow-sm space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                min={0}
                max={maxPrice}
                step={1}
                onValueChange={handlePriceChange}
                className="w-full"
                thumbClassName="bg-primary h-4 w-4 rounded-full"
              />
            </div>

            <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
              <X className="h-4 w-4 mr-1" /> Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
