export interface ImageProps {
  src: string
  alt: string
  width?: string
  height?: string
}

const Image = (props: ImageProps) => {
  return <img {...props} />
}
Image.defaultProps = {
  height: '328px',
  width: '127px',
}

export default Image
