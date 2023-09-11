import SignIn from 'components/organisms/SignIn'
import RampAuthTemplate from 'components/templates/RampAuthTemplate'
import { SIGN_IN } from 'utils/constants'

export interface SignInPage {}

const SignInPage = (props: SignInPage) => {
  return (
    <RampAuthTemplate
      authContent={
        <SignIn
          header={SIGN_IN.HEADER}
          onContinue={() => {}}
          onGoogleClick={() => {}}
          onForget={() => {}}
        />
      }
    />
  )
}

export default SignInPage
