import { useState, useEffect } from 'react'
import { Menu, Button, Text, Avatar } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '../../../stores/store';

function LogInButton() {
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

    const handleLogIn = () => {
        router.push('/login')
      } 
    
      const handleRegister = () => {
        router.push('/register')
      } 

  return ( 
    <div>
    <Button color="green" onClick={handleLogIn}>Log in</Button>
    <Button color="green" onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default LogInButton