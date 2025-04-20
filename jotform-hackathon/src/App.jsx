import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/ui/card';


function App() {
  

  const [formData, setFormData] = useState(null);

  const fetchData = () => {
    const formId = "251074178702960";
    const apiKey = "b0a76b7ea43d64f463e3f23d530baef9";

    fetch(`https://api.jotform.com/form/${formId}/payment-info?apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data.content);
        console.log("Form Items: ", data.content);
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
        {console.log("Form Data: ", formData)}
          {formData ? (
            formData.products.map((item, index) => (
              <div>
               {item.description}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
      </div>
    </>
  )
}

export default App
