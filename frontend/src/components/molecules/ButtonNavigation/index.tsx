import { Grid, styled } from '@mui/material'
import Icons from 'components/atoms/Icons'
import MuiTypography from 'components/atoms/Typography'
import React from 'react'
import theme from 'themes'

export interface ButtonNavigationProps {
  label: string
  onClick: () => void
  beforeClickIcon: string
  afterClickIcon: string
  isActive?: boolean
  sx?: React.CSSProperties
}

const StyledContainer = styled(Grid)(({ isActive }: { isActive: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '0.2rem',
  height: '1.5rem',
  padding: '0.0625rem 0.625rem 0.1875rem 0.625rem',
  cursor: 'pointer',
  backgroundColor: isActive ? theme.palette.primary.primary500 : '',
  borderRadius: isActive ? '2.5rem' : '',
}))

const ButtonNavigation = (props: ButtonNavigationProps) => {
  const { label, onClick, isActive = false } = props

  return (
    <StyledContainer container isActive={isActive} onClick={onClick}>
      <MuiTypography
        variant="body2"
        data-testid="text-id"
        sx={{
          color: isActive ? theme.palette.Text.main : '',
        }}
      >
        {label}
      </MuiTypography>
      <Icons
        src={isActive ? props.afterClickIcon : props.beforeClickIcon}
        alt={'icon not found'}
      />
    </StyledContainer>
  )
}

export default ButtonNavigation
