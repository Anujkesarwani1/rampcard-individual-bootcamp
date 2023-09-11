import { Grid } from '@mui/material'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import CheckboxTypography from 'components/molecules/CheckboxTypography'
import GOOGLE from 'public/assets/image/google.svg'
import { ChangeEvent, useState } from 'react'
import theme from 'themes'
import { Constants, SIGN_IN } from 'utils/constants'
import { validateField } from 'utils/credentials'
import { AuthContainer } from 'utils/styles'
import { SignInDetails } from 'utils/types'
import PasswordVisibilityToggle from './PasswordVisibilityToggle'
import ButtonSection from './ButtonSection'

export interface SignInProps {
  header: string
  onContinue: () => void
  onGoogleClick: () => void
  onForget: () => void
  sx?: React.CSSProperties
}

const SignIn = (props: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [signInDetails, setSignInDetails] = useState<SignInDetails>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<SignInDetails>({
    email: '',
    password: '',
  })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof SignInDetails
  ) => {
    const { value } = event.target
    setSignInDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }))

    const error = validateField(field, value)

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }))
  }

  const isButtonDisabled = !!errors.email || !!errors.password

  return (
    <Grid container flexDirection="column" sx={props.sx}>
      <Grid item>
        <AuthContainer container>
          <Grid item>
            <MuiTypography variant="h2" fontSize="1.5rem">
              <b>{props.header}</b>
            </MuiTypography>
          </Grid>
          <Grid item marginTop="2rem">
            <MuiTypography variant="body1">Email</MuiTypography>
            <CustomTextField
              style={{ paddingBottom: '0.5rem' }}
              placeholder={Constants.EMAIL_PLACEHOLDER}
              value={signInDetails.email}
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
          <Grid item marginTop="2rem">
            <Grid
              container
              sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Grid item>
                <MuiTypography variant="body1">Password</MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography
                  variant="body2"
                  color={theme.palette.primary.primary500}
                  sx={{ cursor: 'pointer' }}
                  onClick={props.onForget}
                >
                  <b>{SIGN_IN.FORGET_PASSWORD}</b>
                </MuiTypography>
              </Grid>
            </Grid>

            <CustomTextField
              style={{ paddingBottom: '0.5rem' }}
              placeholder={Constants.PASSWORD_PLACEHOLDER}
              type={showPassword ? 'text' : 'password'}
              value={signInDetails.password}
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
          <Grid item marginTop="1rem">
            <CheckboxTypography
              label={Constants.STAY_SIGNED_IN}
              variant="body3"
            />
          </Grid>
          <Grid item>
            <ButtonSection
              isButtonDisabled={isButtonDisabled}
              onContinue={props.onContinue}
              onGoogleClick={props.onGoogleClick}
              icon={GOOGLE}
              iconLabel={SIGN_IN.SIGNIN_GOOGLE}
            />
          </Grid>
        </AuthContainer>
      </Grid>
      <Grid item marginTop="0.94rem" marginLeft="2.5rem">
        <MuiTypography variant="body1" sx={{ cursor: 'pointer' }}>
          {SIGN_IN.DONT_ACCOUNT}
          <span style={{ color: theme.palette.primary.primary500 }}>
            <b>Sign up</b>
          </span>
        </MuiTypography>
      </Grid>
    </Grid>
  )
}

export default SignIn
