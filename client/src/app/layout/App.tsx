import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then(data => setProducts(data));
    }, []);

    function addProduct() {
        setProducts(prevState => [...prevState,
            {
                id: prevState.length +101,
                name: 'prod3' + prevState.length * 1,
                price: 300.00,
                brand: 'some brand',
                description: 'some description',
                pictureUrl: 'http://picsum.photos/200',
            }]
        );
    }

  return (
      <div className='app'>
          <Typography variant='h1'>React store</Typography>
          <Catalog products={products} addProduct={addProduct} />
      </div>
  )
}

export default App
