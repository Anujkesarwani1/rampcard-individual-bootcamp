import SignUp from 'components/organisms/SignUp'
import RampAuthTemplate from 'components/templates/RampAuthTemplate'
import { SIGN_UP } from 'utils/constants'

export interface SignUpPage {}

const SignUpPage = (props: SignUpPage) => {
  return (
    <RampAuthTemplate
      authContent={
        <SignUp
          header={SIGN_UP.HEADER}
          onContinue={() => {}}
          onGoogleClick={() => {}}
          onForget={() => {}}
        />
      }
    />
  )
}

export default SignUpPage
