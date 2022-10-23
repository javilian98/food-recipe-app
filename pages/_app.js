import '../styles/globals.css'

import { useState } from 'react';
import { useRouter } from 'next/router'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Button,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  Avatar,
  Group,
  Menu,
  TextInput,
} from '@mantine/core';
import NavbarLinks from '../layouts/Navbar/NavbarLinks';
import UserButton from '../components/users/UserButton/UserButton';

import { useSearchRecipeStore } from '../stores/store'
import { IconSearch } from '@tabler/icons';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
   
  const [searchInput, setSearchInput] = useState('')
  const setSearchKeyword = useSearchRecipeStore(state => state.setKeyword)

  const handleSearchSubmit = () => {
    setSearchKeyword(searchInput)
    router.push('/search')
  } 

  const enterSearchSubmit = (e) => {
    if(e.key === 'Enter')
      handleSearchSubmit()
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Poppins, sans-serif',
        headings: { fontFamily: 'Poppins, sans-serif' },
      }}
    >
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          (router.pathname === '/login' || router.pathname === '/register') 
            ? null 
            : (
              <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                <Navbar.Section grow mt="xs">
                  <NavbarLinks />
                </Navbar.Section>
              </Navbar>
            )
        }  
        aside={
          (router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register') 
            ? null 
            : (
              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
                  <Text>Application sidebar</Text>
                </Aside>
              </MediaQuery>
            )
        } 
        // footer={
        //   <Footer height={60} p="md">
        //     Application footer
        //   </Footer>
        // }
        header={
          <Header height={70} p="xl" style={{ zIndex: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              
              <button onClick={handleHome}>
              Food for thought
              </button>

              {router.pathname !== '/login' && (
                  <Group>
                    <TextInput
                      icon={<IconSearch size={14} />}
                      placeholder="Search recipes"
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)} 
                      onKeyDown={e => enterSearchSubmit(e)}

                    />
                    <Button color="green" onClick={handleSearchSubmit}>Search</Button>
                    <Link href="/search/ingredients">
                      <Button color="blue">Search By Ingredients</Button>
                    </Link>
                  </Group>
              )}

              {/* Letters with xl radius */}
              
              <Group position="center">
                {/* <Menu withArrow>
                  <Menu.Target>
                    <UserButton
                    />
                  </Menu.Target>
                  ...Menu.Items
                </Menu> */}
                <UserButton
                    />
              </Group>
            </div>
          </Header>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}

export default MyApp
