import { Grid } from '@mui/material'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import { ChangeEvent, useState } from 'react'
import theme from 'themes'
import { Constants, SIGN_UP } from 'utils/constants'
import { validateField } from 'utils/credentials'
import { SignUpDetails } from 'utils/types'
import GOOGLE from 'public/assets/image/google.svg'
import { AuthContainer } from 'utils/styles'
import PasswordVisibilityToggle from '../SignIn/PasswordVisibilityToggle'
import ButtonSection from '../SignIn/ButtonSection'

export interface SignUpProps {
  header: string
  onContinue: () => void
  onGoogleClick: () => void
  onForget: () => void
  sx?: React.CSSProperties
}

const SignUp = (props: SignUpProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>({
    fullname: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<SignUpDetails>({
    fullname: '',
    email: '',
    password: '',
  })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof SignUpDetails
  ) => {
    const { value } = event.target
    setSignUpDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }))

    const error = validateField(field, value)

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }))
  }

  const isButtonDisabled =
    !!errors.email || !!errors.password || !!errors.fullname

  return (
    <Grid container flexDirection="column" sx={props.sx}>
      <Grid item>
        <AuthContainer container>
          <Grid item>
            <MuiTypography variant="h2" fontSize="1.5rem">
              <b>{props.header}</b>
            </MuiTypography>
          </Grid>
          <Grid item marginTop="1.44rem">
            <MuiTypography variant="body1">Full name</MuiTypography>
            <CustomTextField
              style={{ paddingBottom: '0.5rem' }}
              placeholder={Constants.FULLNAME_PLACEHOLDER}
              value={signUpDetails.fullname}
              onChange={(event) => handleInputChange(event, 'fullname')}
            />
            {errors.fullname && (
              <MuiTypography
                variant="caption1"
                color={theme.palette.Text.warning}
              >
                {errors.fullname}
              </MuiTypography>
            )}
          </Grid>
          <Grid item marginTop="1.25rem">
            <MuiTypography variant="body1">Email</MuiTypography>
            <CustomTextField
              style={{ paddingBottom: '0.5rem' }}
              placeholder={Constants.EMAIL_PLACEHOLDER}
              value={signUpDetails.email}
              onChange={(event) => handleInputChange(event, 'email')}
            />
            {errors.email && (
              <MuiTypography
                variant="caption1"
                color={theme.palette.Text.warning}
              >
                {errors.email}
              </MuiTypography>
            )}
          </Grid>
          <Grid item marginTop="1.25rem">
            <MuiTypography variant="body1">Password</MuiTypography>
            <CustomTextField
              style={{ paddingBottom: '0.5rem' }}
              placeholder={Constants.PASSWORD_PLACEHOLDER}
              type={showPassword ? 'text' : 'password'}
              value={signUpDetails.password}
              onChange={(event) => handleInputChange(event, 'password')}
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityToggle
                    initialVisibility={showPassword}
                    onToggleVisibility={setShowPassword}
                  />
                ),
              }}
            />
            {errors.password && (
              <MuiTypography
                variant="caption1"
                color={theme.palette.Text.warning}
              >
                {errors.password}
              </MuiTypography>
            )}
          </Grid>
          <Grid item>
            <ButtonSection
              isButtonDisabled={isButtonDisabled}
              onContinue={props.onContinue}
              onGoogleClick={props.onGoogleClick}
              icon={GOOGLE}
              iconLabel={SIGN_UP.SIGN_UP_GOOGLE}
            />
          </Grid>
        </AuthContainer>
      </Grid>
      <Grid item marginTop="0.94rem" marginLeft="2.5rem">
        <MuiTypography variant="body1" sx={{ cursor: 'pointer' }}>
          {SIGN_UP.ALREADY_ACCOUNT}
          <span style={{ color: theme.palette.primary.primary500 }}>
            <b>Sign in</b>
          </span>
        </MuiTypography>
      </Grid>
    </Grid>
  )
}

export default SignUp
