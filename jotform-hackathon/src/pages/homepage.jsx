    import { useEffect, useState } from "react"
    import ProductList from "@/components/product-list"
    import FilterBar from "@/components/filter"

    function Homepage() {
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState({
        searchTerm: "",
        category: "",
        minPrice: 0,
        maxPrice: 100,
    })

    // Fetch products from JotForm API
    const fetchData = () => {
        const formId = "251074178702960"
        const apiKey = "b0a76b7ea43d64f463e3f23d530baef9"

        fetch(`https://api.jotform.com/form/${formId}/payment-info?apiKey=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.content.products)
            setFilteredProducts(data.content.products) // initialize
            console.log("Form Items: ", data.content.products)
        })
        .catch((err) => console.error("Error:", err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Re-apply filters whenever filters or products change
    useEffect(() => {
        if (!products) return

        const filtered = products.filter((product) => {
        const name = product.name?.toLowerCase() || ""
        const desc = product.description?.toLowerCase() || ""
        const search = filters.searchTerm.toLowerCase()

        const matchesSearch = !search || name.includes(search) || desc.includes(search)

        const category = product.description ? product.description.split(" ")[0] : "Other"
        const matchesCategory = !filters.category || category === filters.category

        const price = Number.parseFloat(product.price || "0")
        const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice

        return matchesSearch && matchesCategory && matchesPrice
        })

        setFilteredProducts(filtered)
    }, [filters, products])

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <div className="overflow-hidden">
        <FilterBar className= "overflow-hidden" products={products || []} onFilterChange={handleFilterChange} />

        <div className="w-screen max-h-[90vh] overflow-hidden flex items-center justify-center">
            {products ? (
            <ProductList  products={filteredProducts} />
            ) : (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
            )}
        </div>
        </div>
    )
    }

    export default Homepage
