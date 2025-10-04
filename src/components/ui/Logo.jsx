const Logo = ({ 
  src = "/Logo-FLO.png", 
  alt = "Logo FLO", 
  className = "",
  size = "medium" 
}) => {
  const sizeVariants = {
    small: "h-8 w-auto",
    medium: "h-16 w-auto", 
    large: "h-24 w-auto"
  }

  const logoSize = sizeVariants[size] || sizeVariants.medium

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${logoSize} object-contain ${className}`} 
    />
  )
}

export default Logo