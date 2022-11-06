import { useState, useEffect } from 'react'
import Link from 'next/link';
import { Menu, Button, Text, Avatar } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '../../../stores/store';

function UserButton() {
  const router = useRouter()

  const setAccessToken = useAccessTokenStore(state => state.setAccessToken)

  const tokenDetails = useAccessTokenStore(state => state.tokenDetails)
  const setTokenDetails = useAccessTokenStore(state => state.setTokenDetails)

  const userDetails = useAccessTokenStore(state => state.userDetails)
  const setUserDetails = useAccessTokenStore(state => state.setUserDetails)

  useEffect(() => {
    getUserDetails()
  }, [tokenDetails])

  const logout = async () => {
    const response = await axios.post('http://localhost:3000/api/auth/logout')

    if (response.status === 200) {
      setAccessToken('')
      setTokenDetails(undefined)
      setUserDetails({})
      router.push('/login')
    }
  } 

  const getUserDetails = () => {
    if (tokenDetails !== undefined) {
      const { firstName, lastName } = tokenDetails

      setUserDetails({
        firstName,
        lastName,
        initials: firstName.charAt(0) + lastName.charAt(0)
      })
      console.log('retrieved', userDetails.initials);
    } else {
      setUserDetails({})
      console.log('fail to retrieve');
    }
  }

  

  console.log(tokenDetails)

  return ( 
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl" suppressHydrationWarning>{userDetails.initials}</Avatar>
      </Menu.Target>
 
      <Menu.Dropdown>
        <Menu.Label suppressHydrationWarning>{userDetails.firstName} {userDetails.lastName}</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}><Link href="/userprofile">My Profile</Link></Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />} onClick={logout}>Logout</Menu.Item>
        {/* <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
        >
          Search
        </Menu.Item> */}

        {/* <Menu.Divider /> */}

        {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>,
        <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item> */}
      </Menu.Dropdown> 
    </Menu>
  );
}

export default UserButton