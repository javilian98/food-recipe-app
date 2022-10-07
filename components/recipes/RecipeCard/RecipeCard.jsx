import React from 'react'
import Link from 'next/link';
import { IconAlarm, IconSoup } from '@tabler/icons';
import { Card, Image, Text, Badge, Button, Group, ThemeIcon } from '@mantine/core';

function RecipeCard({ id, title, image, readyInMinutes, servings }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image}
          height={200}
          alt="Norway"
        />
      </Card.Section>

      <Group position="" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
      </Group>

      <Group position="" spacing="xl">
        <Group spacing="xs">
          <ThemeIcon color="green" variant="light">
            <IconAlarm size={20} />
          </ThemeIcon>
  
          <Text size="sm">{readyInMinutes} mins</Text>
        </Group>

        <Group spacing="xs">
          <ThemeIcon color="green" variant="light">
            <IconSoup size={20} />
          </ThemeIcon>
  
          <Text size="sm">{servings} servings</Text>
        </Group>
        
      </Group> 

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text> */}
      <Link href={`/recipes/${id}`}>
        <a>
          <Button variant="light" color="green" fullWidth mt="md" radius="md">
            View Recipe
          </Button>
        </a>
      </Link>
    </Card>
  )
}

export default RecipeCard