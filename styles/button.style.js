const buttonStyle = {
  
  variants: {
    "pushableBlue":{
      bg: "blue.100",
      boxShadow: "lg",
      color: "blue.500",
      borderRadius: "lg",
      fontWeight: "bold",
      position: "relative",
      willChange: "transform",
      transform: "translateY(0px)",
      transition: "transform 100ms ease-in-out",
      _hover: {
        bg: "blue.100",
        transform: "translateY(-2px)"
      },
      _active:{
        bg: "blue.100",
        transform: "translateY(4px)",
        transition: "transform 34ms"
      },
      _focus:{
        bg: "blue.100",
      },
      _disabled:{
        bg: "blue.100",
      }
    }
  },
}

export default buttonStyle;