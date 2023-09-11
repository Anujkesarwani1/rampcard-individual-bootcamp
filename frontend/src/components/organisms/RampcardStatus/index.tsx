import { Grid, styled } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import { useEffect, useState } from 'react'
import { retrieveRampcardStatusData } from 'services/RampcardStatus/getrampcardStatus'
import theme from 'themes'
import { getColorByCount } from 'utils/constants'
import { StatusItem } from 'utils/types'

export interface RampcardStatusProps {
  handleCategoriesRuleClick: (title: string) => void
  rampcardStatusItems: StatusItem[]
}

const StyledContainer = styled(Grid)({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: '3rem',
})

const StyledItemContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.0625rem',
  cursor: 'pointer',
})

const RampcardStatus = (props: RampcardStatusProps) => {
  const [statusItem, setStatusItem] = useState(props.rampcardStatusItems)
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState('')

  const getApiData = async () => {
    try {
      const response = await retrieveRampcardStatusData() // for MockApi: await API.get('/rampCardStatus')
      setStatusItem(response)
      setLoading(false)
    } catch (error: any) {
      setIsError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getApiData()
  }, [])

  if (loading) {
    return <Grid>Loading...</Grid>
  }

  return (
    <>
      <StyledContainer container>
        {statusItem.map((item) => (
          <Grid item key={item.id}>
            <StyledItemContainer
              data-testid="container-item"
              container
              onClick={() => props.handleCategoriesRuleClick(item.title)}
            >
              <Grid item>
                <MuiTypography variant="body3">{item.title}</MuiTypography>
              </Grid>
              <Grid item>
                <MuiTypography
                  variant="body2"
                  color={getColorByCount(item.count)}
                  data-testid={`status-item-${item.id}`}
                >
                  {item.count}
                </MuiTypography>
              </Grid>
            </StyledItemContainer>
          </Grid>
        ))}
      </StyledContainer>
      {isError !== '' && (
        <MuiTypography
          variant="body2"
          color={theme.palette.Text.warning}
          sx={{ paddingTop: '1rem' }}
        >
          {isError}
        </MuiTypography>
      )}
    </>
  )
}

export default RampcardStatus
