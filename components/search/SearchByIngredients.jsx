import React from 'react'
import Link from 'next/link'
import { Button } from '@mantine/core'

function SearchByIngredients({ link }) {
  return (
    <Link href={link}>
        <Button color="blue">Search By Ingredients</Button>
    </Link>
  )
}

export default SearchByIngredients