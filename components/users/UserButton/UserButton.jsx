import { useState, useEffect } from 'react'
import { Menu, Button, Text, Avatar } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '../../../stores/store';

function UserButton() {
  const router = useRouter()

  const tokenDetails = useAccessTokenStore(state => state.tokenDetails)

  const [userDetails, setUserDetails] = useState({})

  const logout = async () => {
    const response = await axios.post('http://localhost:3000/api/auth/logout')

    if (response.status === 200) {
      setUserDetails('')
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

    } else {
      setUserDetails({})
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [tokenDetails])

  return ( 
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">{userDetails.initials}</Avatar>
      </Menu.Target>
 
      <Menu.Dropdown>
        <Menu.Label>{userDetails.firstName} {userDetails.lastName}</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>My Profile</Menu.Item>
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