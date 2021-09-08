import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { ApiClient } from 'adminjs'
import { Box, Loader, H4, Text } from '@adminjs/design-system'
import { useHistory } from 'react-router'

const api = new ApiClient()

const Card = styled(Box)`
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary100};
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.cardHover};
`
const Dashboard = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  useEffect(() => {
    api.getDashboard().then(res => {
      if (!res.data.role.super_admin) {
        history.push('/admin/resources/Ticket/actions/list')
      } else {
        setData({
          tickets: res.data.tickets,
          customers: res.data.users
        })
        setLoading(false);
      }
    })
  }, [])



  return (
    <>
      {
        loading ? (<Loader />) : (
          <Box>

            <Box
              mt={['xl', 'xl']}
              mb="xl"
              mx={[0, 0, 0, 'auto']}
              px={['default', 'lg', 'xxl', '0']}
              position="relative"
              flex
              flexDirection="row"
              flexWrap="wrap"
              width={[1, 1, 1, 1024]}
            >

              <Box width={[1, 1, 1 / 2]} p="lg">
              <Card as="div" flex justifyContent="center" alignItems="center" p="lg">
                  <Box>
                  <H4 fontWeight="bolder"> Total Tickets</H4>
                  <Text fontWeight="bold" textAlign='center' fontSize="18px">{data.tickets}</Text>
                  </Box>
                </Card>
              </Box>


              <Box width={[1, 1, 1 / 2]} p="lg">
                <Card as="div" flex justifyContent="center" alignItems="center" p="lg">
                  <Box>
                    <H4 fontWeight="bolder"> Total Customers</H4>
                    <Text fontWeight="bold" textAlign='center' fontSize="18px">{data.customers}</Text>
                  </Box>
                </Card>
              </Box>

            </Box>
          </Box>
        )

      }
    </>
  )
}

export default Dashboard