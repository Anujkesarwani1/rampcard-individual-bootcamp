import React from 'react'
import { useState } from 'react'
import recruit from '../../../../public/assests/images/recruit.png'
import { Divider, Stack, Modal } from '@mui/material'
import theme from 'themes/Theme'
import IconButton from 'components/atoms/IconButton'
import profile from '../../../../public/assests/images/profile.svg'
import door from '../../../../public/assests/images/Door.svg'
import dash from '../../../../public/assests/images/Dashboard.svg'
import contacts from '../../../../public/assests/images/Contacts.svg'
import hammer from '../../../../public/assests/images/hammer.svg'
import logs from '../../../../public/assests/images/logs.svg'
import analytics from '../../../../public/assests/images/Analytics.svg'
import account from '../../../../public/assests/images/Account.svg'
import screening from '../../../../public/assests/images/Screening.svg'
import styled from '@emotion/styled'
import MuiIcon from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
// import { LogoutCard } from '../logoutCard'
// import { useNavigate } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'

const Button = styled(IconButton)({
  backgroundColor: theme.palette.structural.white,
  border: 'none',
  width: '190px',
  height: '54px',
  bordeRadius: '6px',
  marginBottom: '7px',
  margin: '70px',
  justifyContent: 'flex-start',
  color: theme.palette.greyColor.icon01,
  '&:hover': {
    backgroundColor: theme.palette.textColor.white,
    borderColor: theme.palette.structural.stroke,
  },
})

const Sidebar = () => {
//   const navigate = useNavigate()
//   const { logout } = useAuth0()

  const [logoutState, setLogoutState] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  const toggleLogout = () => {
    setOpen(true)
    setLogoutState(!logoutState)
  }

  return (
    <Stack
      width="200px"
      height="670px"
      borderRadius="8px"
      sx={{ backgroundColor: theme.palette.structural.white }}
      justifyContent="space-between"
      spacing={3}
      padding={3}
      gap="11px"
      boxShadow="0px 4px 28px 0px rgba(45, 45, 47, 0.10)"
    >
      <Stack spacing={2}>
        <MuiIcon src={recruit} width="78px" height="20px" alt={''} />
        <Button variant="outlined" icon={dash} text="Home" />
        <Button
          variant="outlined"
          icon={contacts}
          text="Candidates"
        //   onClick={() => navigate('/candidates')}
        />
        <Button
          variant="outlined"
          icon={hammer}
          text="Adverse Action"
          onClick={() => {
            // navigate('/adverse-actions')
          }}
        />
        <Button variant="outlined" icon={logs} text="Logs" />
        <Button variant="outlined" icon={analytics} text="Analytics" />
        <Button variant="outlined" icon={account} text="Account" />
        <Button variant="outlined" icon={screening} text="Screenings" />
      </Stack>
      <Stack>
        <Divider />
        <Stack direction="row" spacing={3} data-testid="icon-element">
          <MuiIcon src={profile} alt={''} />
          <Stack>
            <MuiTypography
              label="James Rodriguez"
              color={`${theme.palette.textColor.highemp}`}
              variant={theme.typography.heading1}
            />
            <MyTypo
              label="James.co"
              color={`${theme.palette.textColor.lowemp}`}
              variant={theme.typography.heading1}
            />
          </Stack>
          <Button variant="text" icon={door} onClick={toggleLogout} />
          {logoutState && (
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
                margin: '19%',
              }}
            >
              <LogoutCard
                handleCancel={toggleLogout}
                handleLogout={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              />
            </Modal>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Sidebar
