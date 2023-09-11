import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { useState } from 'react'
import theme from 'themes'

interface PasswordVisibilityToggleProps {
  initialVisibility: boolean
  onToggleVisibility: (newVisibility: boolean) => void
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  initialVisibility,
  onToggleVisibility,
}) => {
  const [showPassword, setShowPassword] = useState(initialVisibility)

  const togglePasswordVisibility = () => {
    const newVisibility = !showPassword
    setShowPassword(newVisibility)
    onToggleVisibility(newVisibility)
  }

  return (
    <InputAdornment
      position="end"
      style={{
        cursor: 'pointer',
        color: theme.palette.Text.highEmphasis,
      }}
    >
      {showPassword ? (
        <VisibilityOutlined
          data-testid="toggle-password-visibility-icon"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <VisibilityOffOutlined
          data-testid="toggle-password-visibility-icon"
          onClick={togglePasswordVisibility}
        />
      )}
    </InputAdornment>
  )
}

export default PasswordVisibilityToggle
