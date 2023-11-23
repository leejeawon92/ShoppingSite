import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';

export default function Products() {
  const { isLoading, error, data: products } = useQuery({ queryKey: ['products'], queryFn: getProducts });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <li className='rounded-lg shadow-md overflow-hidden cursor-pointer'>
            <img className='w-full' src={product.image} alt={product.title} />
            <div className='mt-2 px-2 text-lg flex justify-between items-center'>
              <h3 className='truncate'>{product.title}</h3>
              <p>{`₩${product.price}`}</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>{product.category}</p>
          </li>
          ))}
      </ul>
    </>
  );
}
