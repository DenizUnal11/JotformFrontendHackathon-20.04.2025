import { useEffect, useState } from 'react'
import ProductList from '@/components/product-list';
import Filter from '@/components/filter';

function Homepage() {

  const [products, setProducts] = useState(null);

  const fetchData = () => {
    const formId = "251074178702960";
    const apiKey = "b0a76b7ea43d64f463e3f23d530baef9";

    fetch(`https://api.jotform.com/form/${formId}/payment-info?apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.content.products);
        console.log("Form Items: ", data.content.products);
      })
      .catch(err => console.error("Error:", err));
  }

  useEffect(() => {
    fetchData();
  }
  , []);
  
return (
    <>
        <div>
            {/*<Filter />*/}
            <div className="w-screen min-h-screen overflow-hidden flex items-center justify-center">
                {products ? (
                    <ProductList products={products} />
                ) : (
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                )}
            </div>
        </div>  
    </>
)
}

export default Homepage
