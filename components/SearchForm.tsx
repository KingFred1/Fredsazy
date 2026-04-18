import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset';
import { Search } from "lucide-react"

const SearchForm = ({ query, category }: { query?: string; category?: string }) => {
  return (
    <Form action="/" scroll={false} className='search-form'>
      <input
        type='search'
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search tech articles'
        autoComplete='off'
        aria-label='Search articles'
      />
      {category && <input type='hidden' name='category' value={category} />}
      <div className='flex gap-2'>
        {query && <SearchFormReset />}
        <button type='submit' className='search-btn text-white'>
          <span className='sr-only'>Search</span>
          <Search className='size-5' />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
