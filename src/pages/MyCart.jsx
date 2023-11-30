import React from 'react';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({ queryKey: ['carts'], queryFn: () => getCart(uid) });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

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
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
}
