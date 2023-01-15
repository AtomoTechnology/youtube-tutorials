import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { Button } from 'primereact/button';
import './App.css';
import { Dropdown } from 'primereact/dropdown';

function App() {
  const [count, setCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
      });

    return () => {};
  }, []);

  console.log(selectedProduct);

  return (
    <div className='select'>
      <Dropdown
        value={selectedProduct}
        onChange={(e) => {
          setSelectedProduct(e.value);
        }}
        optionLabel='id'
        placeholder='seleccionar un producto'
        optionValue='id'
        options={products}
        itemTemplate={(option) => {
          return (
            <div className='product'>
              <img
                width={25}
                src={option.thumbnail}
                alt={option.title}
              />
              <span className='product-detail'>
                <span>{option.title}</span>
                <span>${option.price}</span>
              </span>
            </div>
          );
        }}
        valueTemplate={(option, props) => {
          if (option) {
            return (
              <div className='product'>
                <img
                  width={25}
                  src={option.thumbnail}
                  alt={option.title}
                />
                <span className='product-detail'>
                  <span>{option.title}</span>
                  <span>${option.price}</span>
                </span>
              </div>
            );
          }

          return <span> {props.placeholder}</span>;
        }}
      />
    </div>
  );
}

export default App;
