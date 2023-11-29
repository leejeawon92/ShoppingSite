import React from 'react';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({ queryKey: ['carts'], queryFn: () => getCart(uid) });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <li className='flex justify-between my-2 items-center'>
                  <img className='w-24 md:w-48 rounded-lg' src={product.image} alt={product.title} />
                  <div className='flex-1 flex justify-between ml-4'>
                    <div className='basis-3/5'>
                      <p className='text-lg'>{product.title}</p>
                      <p className='text-xl font-bold text-brand'>{product.option}</p>
                      <p>₩{product.price}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </section>
  );
}
