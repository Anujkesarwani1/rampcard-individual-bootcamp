import { Grid } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import MuiTypography from 'components/atoms/Typography'
import TransactionItem from 'components/molecules/TransactionItem'
import DropdownItem from 'pages/Accounting/DropdownItem'
import theme from 'themes'
import { WhiteButton } from 'utils/styles'
import {
  InputData,
  NavigationData,
  OptionItem,
  ProfileOption,
  Rows,
  StatusItem,
} from 'utils/types'

export const enum Constants {
  EMAIL_PLACEHOLDER = 'orders@supertodo.me',
  PASSWORD_PLACEHOLDER = 'Test@123',
  FULLNAME_PLACEHOLDER = 'John doe',
  ICON_ALT = 'Icon not found',
  STAY_SIGNED_IN = 'Stay signed in for a week',
  CONTINUE = 'Continue',
  OR = 'OR',
}

export const enum BANNER {
  HEADER = 'Save time with a merchant Rule',
  CONTENT = 'Save “Travel as the default Quickbooks category for all the future and unsynced transactions from “Lyft”.',
}

export const enum REPORTING_CARD {
  HEADER = 'Partner reward found',
  CONTENT = "You're paying for Amazon Web Services - leverage our partnership",
  AWS_HEADER = 'Potential Savings',
  AWS_AMOUNT = '$5,000.00',
  PARTNER_REWARD = 'Go to partner reward',
}

export const options: OptionItem[] = [
  { id: 1, label: 'Expense' },
  { id: 2, label: 'Travel', enabled: true },
  { id: 3, label: 'Travel meals' },
  { id: 4, label: 'Hotels' },
]

export const categories: OptionItem[] = [
  { id: 1, label: 'Expense' },
  { id: 2, label: 'Advertising' },
  { id: 3, label: 'Disposals' },
  { id: 4, label: 'Bank charges' },
]

export const enum RAMP_CATEGORY_INPUT {
  LABEL = 'Ramp category',
  PLACEHOLDER = 'Enter Ramp category',
}

export const enum PasswordValidationMessage {
  MESSAGE_MIN_LENGTH = 'Password should have at least 8 characters.',
  MESSAGE_SPECIAL_CHARS_REGEX = 'Password should contain at least one special character (!@#$%^&*(),.?":{}|<>).',
  MESSAGE_NUMBER_REGEX = 'Password should contain at least one number (0-9).',
  MESSAGE_LOWERCASE_REGEX = 'Password should contain at least one lowercase letter (a-z).',
  MESSAGE_UPPERCASE_REGEX = 'Password should contain at least one uppercase letter (A-Z).',
}

export const ERROR_MESSAGES = {
  email:
    'Invalid email format. Please enter a valid email address, like example@example.com.',
  fullname:
    'Full name should contain only letters. Please avoid numbers and symbols.',
}

export const enum SIGN_IN {
  HEADER = 'Sign in to your account',
  DONT_ACCOUNT = 'Don’t have an account? ',
  FORGET_PASSWORD = 'Forgot your password ?',
  SIGNIN_GOOGLE = 'Sign in with Google',
}

export const enum SIGN_UP {
  HEADER = 'Sign Up',
  SIGN_UP_GOOGLE = 'Sign up with Google',
  ALREADY_ACCOUNT = 'Already have an account? ',
}

export const statusItems: StatusItem[] = [
  { id: 1, title: 'Missing items', count: 79 },
  { id: 2, title: 'Merchant rules', count: 2 },
  { id: 3, title: 'Category rules', count: 3 },
  { id: 4, title: 'Department rules', count: 0 },
  { id: 5, title: 'Location rules', count: 0 },
]

export const getColorByCount = (count: number) => {
  if (count === 0) {
    return `${theme.palette.Text.lowEmphasis}`
  } else if (count === getMaxCount()) {
    return `${theme.palette.Accent.accentRed100}`
  } else {
    return `${theme.palette.primary.primary500}`
  }
}

export const getMaxCount = () => {
  return Math.max(...statusItems.map((item) => item.count))
}

export const enum CREATE_MERCHANT_RULE {
  HEADER = 'Create merchant rule',
  CONTENT = 'Set a default QuickBooks Category for "Lyft". This rule will be applied automatically to all unsynced and future transactions from "Lyft".',
  TRANSACTIONS = '42 unsynced transactions',
}

export const profileOptions: ProfileOption[] = [
  { id: 1, option: 'Create Ramp category' },
  { id: 2, option: 'View Ramp category' },
  { id: 3, option: 'Delete Ramp category' },
]

export const enum CREATE_RAMP_CATEGORY {
  HEADER = 'Create Ramp category',
  CONTENR_HEADER = 'Ramp categories',
  CONTENT = 'Ramp automatically categorizes your card transactions. You can set a default QuickBooks Category for each Ramp Category below.',
}

export const enum CREATE_CATEGORY_RULE {
  HEADER = 'Create category rule',
  CONTENT_HEADER = 'Category Rules',
  RULES_HEADER = 'What are category rules?',
  RULES_CONTENT = 'Category rules allow you to set a default QuickBooks Category for all transactions from a specific Ramp Category.',
}

export const activeRules: InputData[] = [
  {
    id: 1,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'Airlines',
    dropdownValue: 'Travel',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
  {
    id: 2,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'Fuel and Gas',
    dropdownValue: 'Automobile:Fuel',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
  {
    id: 3,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'SaaS / Software',
    dropdownValue: 'Dues & Subscriptions',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
]

export const recentCategories: InputData[] = [
  {
    id: 1,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'Advertising',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
  {
    id: 2,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'Shipping',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
  {
    id: 3,
    label: RAMP_CATEGORY_INPUT.LABEL,
    value: 'Other',
    placeholder: RAMP_CATEGORY_INPUT.PLACEHOLDER,
  },
]

export const navigationData: NavigationData[] = [
  { id: 1, label: 'Insights' },
  { id: 2, label: 'Transaction' },
  { id: 3, label: 'Cards' },
  { id: 4, label: 'Company' },
  { id: 5, label: 'Bill pay' },
  { id: 6, label: 'Vendors' },
  { id: 7, label: 'Reimbursement' },
  { id: 8, label: 'Accounting' },
]

export const columns: GridColDef[] = [
  {
    field: 'transactions',
    headerName: 'TRANSACTIONS',
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <TransactionItem
          label={params.row.brand.label}
          sublabel={params.row.brand.sublabel}
        />
      )
    },
  },
  {
    field: 'amount',
    headerName: 'AMOUNT',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="body2">
          <b>{params.row.amount}</b>
        </MuiTypography>
      )
    },
  },
  {
    field: 'date',
    headerName: 'DATE',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="body2">
          <b>{params.row.date}</b>
        </MuiTypography>
      )
    },
  },
  {
    field: 'user',
    headerName: 'USER',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Grid container flexDirection="column">
          <MuiTypography variant="body2">
            <b>{params.row.user.name}</b>
          </MuiTypography>
          <MuiTypography variant="body3" color={theme.palette.Text.lowEmphasis}>
            {params.row.user.virtual}
          </MuiTypography>
        </Grid>
      )
    },
  },
  {
    field: 'quickBooksCategory',
    headerName: 'QUICKBOOKS CATEGORY',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <DropdownItem options={params.row.quickBooksCategory} />
    },
  },
  {
    field: 'receipt',
    headerName: 'RECEIPT',
    width: 140,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="body2">
          <b>{params.row.receipt}</b>
        </MuiTypography>
      )
    },
  },
  {
    field: 'memo',
    headerName: 'MEMO',
    width: 140,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="body2">
          <b>{params.row.memo}</b>
        </MuiTypography>
      )
    },
  },
  {
    field: 'sync',
    headerName: 'SYNC',
    width: 140,
    renderCell: (params: GridRenderCellParams) => {
      return <WhiteButton variant="contained">{params.row.sync}</WhiteButton>
    },
  },
]

export const rows: Rows[] = [
  {
    id: 1,
    brand: { label: 'H&M', sublabel: 'casio' },
    amount: '$42,000',
    date: 'Apr 14, 2004',
    user: { name: 'Hellena John', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#200257',
    memo: '21-00006',
    sync: 'Make ready',
  },
  {
    id: 2,
    brand: { label: 'Renuar', sublabel: 'arscris' },
    amount: '$42,000',
    date: 'Sep 19, 2010',
    user: { name: 'Afolabi David', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526534',
    memo: '21-00004',
    sync: 'Make ready',
  },
  {
    id: 3,
    brand: { label: 'Zara', sublabel: 'denil_we' },
    amount: '$37,000',
    date: 'Aug 28, 2004',
    user: { name: 'David Oshodi', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526520',
    memo: '21-00010',
    sync: 'Make ready',
  },
  {
    id: 4,
    brand: { label: 'Bershka', sublabel: 'shop123' },
    amount: '$21,000',
    date: 'Aug 07, 2019',
    user: { name: 'Adekunle Fisayo', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526589',
    memo: '21-00005',
    sync: 'Make ready',
  },
  {
    id: 5,
    brand: { label: 'Stradivarius', sublabel: 'demode' },
    amount: '$17,000',
    date: 'May 16, 2005',
    user: { name: 'Mbah Jacob', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526587',
    memo: '21-00007',
    sync: 'Make ready',
  },
  {
    id: 6,
    brand: { label: 'American Eagle', sublabel: 'shopsieu' },
    amount: '$12,000',
    date: 'Aug 27, 2019',
    user: { name: 'James Friday', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#105986',
    memo: '21-00400',
    sync: 'Make ready',
  },
  {
    id: 7,
    brand: { label: 'Bershka', sublabel: 'shop123' },
    amount: '$21,000',
    date: 'Aug 07, 2019',
    user: { name: 'Adekunle Fisayo', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526589',
    memo: '21-00005',
    sync: 'Make ready',
  },
  {
    id: 8,
    brand: { label: 'Stradivarius', sublabel: 'demode' },
    amount: '$17,000',
    date: 'May 16, 2005',
    user: { name: 'Mbah Jacob', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526587',
    memo: '21-00007',
    sync: 'Make ready',
  },
  {
    id: 9,
    brand: { label: 'Renuar', sublabel: 'arscris' },
    amount: '$42,000',
    date: 'Sep 19, 2010',
    user: { name: 'Afolabi David', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526534',
    memo: '21-00004',
    sync: 'Make ready',
  },
  {
    id: 10,
    brand: { label: 'Zara', sublabel: 'denil_we' },
    amount: '$37,000',
    date: 'Aug 28, 2004',
    user: { name: 'David Oshodi', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526520',
    memo: '21-00010',
    sync: 'Make ready',
  },
  {
    id: 11,
    brand: { label: 'H&M', sublabel: 'casio' },
    amount: '$42,000',
    date: 'Apr 14, 2004',
    user: { name: 'Hellena John', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#200257',
    memo: '21-00006',
    sync: 'Make ready',
  },
  {
    id: 12,
    brand: { label: 'American Eagle', sublabel: 'shopsieu' },
    amount: '$12,000',
    date: 'Aug 27, 2019',
    user: { name: 'James Friday', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#105986',
    memo: '21-00400',
    sync: 'Make ready',
  },
  {
    id: 13,
    brand: { label: 'Stradivarius', sublabel: 'demode' },
    amount: '$17,000',
    date: 'May 16, 2005',
    user: { name: 'Mbah Jacob', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526587',
    memo: '21-00007',
    sync: 'Make ready',
  },
  {
    id: 14,
    brand: { label: 'American Eagle', sublabel: 'shopsieu' },
    amount: '$12,000',
    date: 'Aug 27, 2019',
    user: { name: 'James Friday', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#105986',
    memo: '21-00400',
    sync: 'Make ready',
  },
  {
    id: 15,
    brand: { label: 'Bershka', sublabel: 'shop123' },
    amount: '$21,000',
    date: 'Aug 07, 2019',
    user: { name: 'Adekunle Fisayo', virtual: '(Virtual 7007)' },
    quickBooksCategory: options,
    receipt: '#526589',
    memo: '21-00005',
    sync: 'Make ready',
  },
]
