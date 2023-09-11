import { Grid, styled } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MuiTypography from 'components/atoms/Typography'
import { useEffect, useState } from 'react'
import theme from 'themes'
import { WhiteButton } from 'utils/styles'
import CANCEL from 'public/assets/image/cancel.svg'
import FILTER from 'public/assets/image/filter.svg'
import TRASH from 'public/assets/image/trash.svg'
import SEARCH from 'public/assets/image/search.svg'
import CALENDAR from 'public/assets/image/calendar.svg'
import CANCELCIRCLE from 'public/assets/image/cancelCircle.svg'
import IconTypography from '../SignIn/IconTypography'
import { Rows } from 'utils/types'
import _ from 'lodash'
import CustomTextField from 'components/atoms/Input'
import MuiIcon from 'components/atoms/Icons'
import { Constants } from 'utils/constants'
import Chip from 'components/molecules/Chip'
import SearchSuggestionPanel from 'components/molecules/SearchSuggestionPanel'
import { retrieveTransactionData } from 'services/transaction/getTransaction'

export interface DatatableProps {
  rows: Rows[]
  columns: GridColDef[]
  onTrash: () => void
  onClear: () => void
  onFilter: () => void
  onSync: () => void
}

const ListFooter = styled(Grid)({
  marginTop: '0.75rem',
  width: '90rem',
  justifyContent: 'space-between',
})

const Datatable = (props: DatatableProps) => {
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [myData, setMyData] = useState(props.rows)
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [openLyft, setOpenLyft] = useState(false)

  const getApiData = async (page: number) => {
    try {
      const response = await retrieveTransactionData() // MOCK_API.get('/transactions') //
      setMyData(response)
      setLoading(false)
    } catch (error: any) {
      setIsError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getApiData(currentPage)
  }, [currentPage])

  if (loading) {
    return <Grid>Loading...</Grid>
  }

  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const currentRows = myData.slice(startIndex, endIndex)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setOpenLyft(!openLyft)
    setAnchorEl(null)
  }

  const handleChipClick = () => {
    setOpenLyft(!openLyft)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'popover-textfield' : undefined

  const handlePreviousClick = () => {
    const newPage = _.clamp(currentPage - 1, 0, currentPage)
    setCurrentPage(newPage)
  }

  const handleNextClick = () => {
    const newPage = _.clamp(
      currentPage + 1,
      0,
      Math.ceil(myData.length / pageSize) - 1
    )
    setCurrentPage(newPage)
  }

  const handleSelectionChange = (newSelection: any[]) => {
    setSelectedRows(newSelection)
  }

  return (
    <Grid container>
      <Grid
        item
        container
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="0.75rem"
      >
        <Grid item>
          <Grid container alignItems="center" gap="1rem">
            <Grid item>
              <CustomTextField
                data-testid="search-cards"
                sx={{ width: '28.5rem' }}
                size="small"
                placeholder="  Search cards"
                InputProps={{
                  startAdornment: (
                    <MuiIcon src={SEARCH} alt={Constants.ICON_ALT} />
                  ),
                }}
                onChange={handleClick}
                aria-describedby={id}
              />
              <SearchSuggestionPanel
                data-testid="search-suggestion-panel"
                open={open}
                item="Lyft"
                onClick={handleClose}
              />
            </Grid>
            <Grid item>
              <Chip
                label="All cards"
                icon={CALENDAR}
                onClick={() => {}}
                style={{
                  width: '8rem',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  color: `${theme.palette.Text.mediumEmphasis}`,
                }}
                alt={'All cards'}
              />
            </Grid>
            <Grid item>
              {openLyft && (
                <Chip
                  alt="Cross"
                  label="Lyft"
                  icon={CANCELCIRCLE}
                  onClick={handleChipClick}
                  style={{
                    color: `${theme.palette.primary.primary500}`,
                    fontWeight: 'bold',
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            flexDirection="row"
            justifyContent="flex-end"
            gap="0.5rem"
          >
            <Grid item>
              {selectedRows.length > 0 && (
                <IconTypography
                  icon={TRASH}
                  label="Delete"
                  sx={{
                    color: theme.palette.Text.lowEmphasis,
                    gap: '0.25rem',
                    cursor: 'pointer',
                    paddingTop: '0.2rem',
                  }}
                  iconPaddingTop="0.2rem"
                  onClick={props.onTrash}
                />
              )}
            </Grid>
            <Grid item>
              <IconTypography
                icon={CANCEL}
                label="Clear filter"
                sx={{
                  color: theme.palette.Text.lowEmphasis,
                  gap: '0.25rem',
                  cursor: 'pointer',
                  paddingTop: '0.2rem',
                }}
                iconPaddingTop="0.2rem"
                onClick={props.onClear}
              />
            </Grid>
            <Grid item>
              <IconTypography
                icon={FILTER}
                label="Filter"
                sx={{
                  color: theme.palette.primary.primary500,
                  cursor: 'pointer',
                  paddingTop: '0.2rem',
                }}
                onClick={props.onFilter}
              />
            </Grid>
            <Grid item>
              <WhiteButton variant="contained" onClick={props.onSync}>
                Sync
              </WhiteButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ height: 369.5, width: '100%' }}>
        <DataGrid
          data-testid="datagrid-id"
          rows={currentRows}
          columns={props.columns}
          checkboxSelection
          hideFooter
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Grid>
      <Grid item>
        <ListFooter container>
          <Grid item>
            <MuiTypography variant="body2">
              <b>{myData.length}</b> results
            </MuiTypography>
          </Grid>
          <Grid item>
            <WhiteButton
              variant="contained"
              onClick={handlePreviousClick}
              sx={{ marginRight: '0.5rem' }}
            >
              Previous
            </WhiteButton>
            <WhiteButton variant="contained" onClick={handleNextClick}>
              Next
            </WhiteButton>
          </Grid>
        </ListFooter>
        {isError !== '' && (
          <MuiTypography variant="body2" color={theme.palette.Text.warning}>
            {isError}
          </MuiTypography>
        )}
      </Grid>
    </Grid>
  )
}

export default Datatable
