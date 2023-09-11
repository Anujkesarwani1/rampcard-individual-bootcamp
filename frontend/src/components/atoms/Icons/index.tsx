interface IconProps {
  src: string
  alt: string
  style?: React.CSSProperties
  width?: string
  height?: string
  onClick?: () => void
  visible?: boolean
}

const MuiIcon = ({ visible = true, ...props }: IconProps) => {
  if (!visible) {
    return null
  }

  const { src, alt, style, height, width, onClick } = props
  return (
    <img
      data-testid="Atom-Icon"
      src={src}
      alt={alt}
      style={style}
      height={height}
      width={width}
      onClick={onClick}
    />
  )
}

export default MuiIcon
