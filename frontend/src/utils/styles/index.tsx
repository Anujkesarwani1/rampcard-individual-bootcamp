import { Grid, styled } from '@mui/material'
import Button from 'components/atoms/Button'
import theme from 'themes'

export const modalStyle = {
  outline: 'none',
  display: 'flex',
  width: '19.5rem',
  padding: '1rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
  borderRadius: '0.25rem',
  border: `1px solid var(--borders-flat, #E0E6EB)`,
  background: `var(--backgrounds-surface, #FFF)`,
}

export const WhiteButton = styled(Button)({
  textTransform: 'none',
  padding: '0.1875rem 0.5rem 0.3125rem 0.5rem',
  borderRadius: '0.25rem',
  background: `${theme.palette.Structural.main}`,
  color: `${theme.palette.Text.highEmphasis}`,
  '&:hover': {
    backgroundColor: '#F4EFFF',
  },
})

export const AuthContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: '0',
  borderRadius: '0.25rem',
  background: `${theme.palette.Structural.main}`,
  boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.17)',
  padding: '2.75rem',
})

export const StyledContinueButton = styled(Button)({
  height: '2.7rem',
  textTransform: 'none',
})

export const StyledGoogleButton = styled(Button)({
  border: `1px solid ${theme.palette.Structural.stroke100}`,
  height: '2.7rem',
  textTransform: 'none',
})

export const ModalHeader = styled(Grid)({
  display: 'flex',
  width: '28rem',
  height: '3.5rem',
  padding: '1rem 0.75rem 1rem 1.25rem',
  justifyContent: 'flex-start',
  borderRadius: '0.375rem 0.375rem 0rem 0rem',
  borderBottom: `1px solid ${theme.palette.Structural.stroke100}`,
})

export const ModalFooter = styled(Grid)({
  display: 'flex',
  width: '28rem',
  height: '3.75rem',
  padding: '0.875rem 1.25rem 0.875rem 14.3rem',
  justifyContent: 'flex-end',
  marginTop: '1rem',
  gap: '0.5rem',
  borderRadius: '0rem 0rem 0.375rem 0.375rem',
  borderTop: `1px solid ${theme.palette.Structural.stroke100}`,
})
