import React from 'react'
import { TextInput, Button } from '@mantine/core'
import { IconSearch } from '@tabler/icons'

function Search({ searchInput, setSearchInput, handleSearchSubmit, link }) {
  return (
    <>
        <TextInput
            icon={<IconSearch size={14} />}
            placeholder="Search recipes"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
        />
        <Button color="green" onClick={handleSearchSubmit}>Search</Button>
    </>
  )
}

export default Search