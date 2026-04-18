"use client"
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import React from 'react'

const SearchFormReset = () => {
  const router = useRouter();

  const reset = () => {
    router.push('/');
  }

  return (
    <button type='button' onClick={reset} className='search-btn text-white'>
      <span className='sr-only'>Clear search</span>
      <X className='size-5' />
    </button>
  )
}

export default SearchFormReset