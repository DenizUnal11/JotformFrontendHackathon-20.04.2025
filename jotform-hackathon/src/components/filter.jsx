
//taken from here, date: 20.04.2025
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iumiqYMzRpZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */



import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function Filter() {
  const [filters, setFilters] = useState({
    keyword: "",
    dateRange: { start: null, end: null },
    categories: [],
    tags: [],
    priceRange: [0, 1000],
    additionalFilters: {
      inStock: false,
      onSale: false,
    },
  })

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      keyword: "",
      dateRange: { start: null, end: null },
      categories: [],
      tags: [],
      priceRange: [0, 1000],
      additionalFilters: {
        inStock: false,
        onSale: false,
      },
    })
  }

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters)
  }

  return (
    <div className="bg-background p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Advanced Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Keyword Input */}
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            type="text"
            placeholder="Search by keyword"
            value={filters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <Label htmlFor="price">Price Range</Label>
          <Slider
            id="price"
            min={0}
            max={1000}
            step={10}
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear All
        </Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  )
}
