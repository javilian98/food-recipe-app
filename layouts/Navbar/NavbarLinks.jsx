
import React from 'react';
import Link from 'next/link';
import { IconMeat, IconHeart, IconMessages, IconStars, IconApple } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text, MediaQuery, Space } from '@mantine/core'; 
// import Search from '../../components/search/Search';

function NavbarLink({ icon, color, label, link }) {
    return (
      <Link href={link}>
        <a> 
          <UnstyledButton
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <ThemeIcon color={color} variant="light">
                {icon}
              </ThemeIcon> 
      
              <Text size="md">{label}</Text>
            </Group>
          </UnstyledButton>
        </a>
      </Link>
    );
  }
  
  const data = [
    { icon: <IconStars size={20} />, color: 'blue', label: 'Featured', link: '/' },
    // { icon: <IconMeat size={20} />, color: 'green', label: 'My Recipes' },
    { icon: <IconHeart size={20} />, color: 'red', label: 'Favourites', link: '/favourites' },
    { icon: <IconApple size={20} />, color: 'green', label: 'Healthier Choices', link: '/recommendedrecipes' },
  ];

export default function NavbarLinks({ Search, SearchByIngredients }) {
    const links = data.map((link) => <NavbarLink {...link} key={link.label} />);

    return (
      <div>
        {links}
        <div className="hide-search-mobile">
          <div>
          {Search}
          </div>
          <Space h={20} />
          {SearchByIngredients}
        </div>
      </div>
    );
}