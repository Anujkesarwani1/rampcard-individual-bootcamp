import Button from 'components/atoms/Button'
import theme from 'themes'
import { WhiteButton } from 'utils/styles'

export interface ModalFooterProps {
  onCancel: () => void
  onCreateRule: () => void
}

const ModalFooterBox = (props: ModalFooterProps) => {
  return (
    <>
      <WhiteButton
        variant="contained"
        data-testid="cancel-btn"
        onClick={props.onCancel}
      >
        Cancel
      </WhiteButton>
      <Button
        data-testid="create-btn"
        variant="contained"
        style={{
          textTransform: 'none',
          width: '7.5rem',
          background: theme.palette.primary.primary500,
        }}
        onClick={props.onCreateRule}
      >
        Create rule
      </Button>
    </>
  )
}

export default ModalFooterBox
