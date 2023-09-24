import { useState } from "react"

function App() {
    const [products, setProducts] = useState([
        { name: 'product1', price: 100.00 },
        { name: 'product2', price: 200.00 }
    ]);

    function addProduct() {
        setProducts(prevState => [...prevState, { name: 'prod3' + prevState.length * 1, price: 300.00 }]);
    }

  return (
      <div className='app'>
          <h1 style={{ color: 'blue' }}>Re-Store</h1> 
          <ul>
              {products.map((x, index) => (
                  <li key={index} >{x.name} - {x.price.toFixed(2)}</li>
              ))}
          </ul>
          <button onClick={addProduct}>Add click</button>
      </div>
  )
}

export default App
