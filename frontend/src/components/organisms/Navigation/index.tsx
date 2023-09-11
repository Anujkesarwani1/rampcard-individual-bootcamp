import { Grid } from '@mui/material'
import ButtonNavigation from 'components/molecules/ButtonNavigation'
import BlackDownChevron from 'public/assets/image/black_down_chevron.svg'
import WhiteDownChevron from 'public/assets/image/white_down_chevron.svg'
import { useState } from 'react'
import { NavigationData } from 'utils/types'

export interface NavigationProps {
  navigationData: NavigationData[]
}

const Navigation = (props: NavigationProps) => {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(
    props.navigationData.length
  )
  const [rampButtonActive, setRampButtonActive] = useState(false)

  const handleButtonClick = (buttonId: number, label: string) => {
    setActiveButtonId(buttonId)
    if (label === 'Ramp perks') {
      setRampButtonActive((prevActive) => !prevActive)
    }
  }

  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      margin="0.5rem 0rem 0.5rem 2.5rem"
    >
      {props.navigationData.map((buttonData) => (
        <Grid item key={buttonData.id}>
          <ButtonNavigation
            label={buttonData.label}
            onClick={() => handleButtonClick(buttonData.id, buttonData.label)}
            isActive={activeButtonId === buttonData.id}
            beforeClickIcon={BlackDownChevron}
            afterClickIcon={WhiteDownChevron}
          />
        </Grid>
      ))}
      <Grid item sx={{ margin: '0.5rem 5rem 0.5rem auto' }}>
        <ButtonNavigation
          label="Ramp perks"
          onClick={() => handleButtonClick(0, 'Ramp perks')}
          isActive={rampButtonActive}
          beforeClickIcon={BlackDownChevron}
          afterClickIcon={WhiteDownChevron}
        />
      </Grid>
    </Grid>
  )
}

export default Navigation
