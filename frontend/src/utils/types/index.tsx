export interface OptionItem {
  id?: number
  label: string
  enabled?: boolean
}

export interface SignInDetails {
  email: string
  password: string
}

export interface SignUpDetails {
  fullname: string
  email: string
  password: string
}

export interface StatusItem {
  id: number
  title: string
  count: number
}

export interface ProfileOption {
  id: number
  option: string
}

export interface Rows {
  id: number
  brand: {
    label: string
    sublabel: string
  }
  amount: string
  date: string
  user: {
    name: string
    virtual: string
  }
  quickBooksCategory: OptionItem[]
  receipt: string
  memo: string
  sync: string
}

export interface InputData {
  id: number
  label: string
  value: string
  dropdownValue?: string
  placeholder: string
}

export interface NavigationData {
  id: number
  label: string
}
