const buttonStyle = {
  baseStyle: {

  },
  sizes: {
   
  },
  variants: {
    "pushable": {
      bg: "teal.200",
      position: "relative",
      willChange: "transform",
      transform: "translateY(0px)",
      transition: "transform 100ms ease-in-out",
      _hover: {
        transform: "translateY(-2px)"
      },
      _active: {
        transform: "translateY(4px)",
        transition: "transform 34ms"
      }
    },
    "black":{
      bg: "black.300",
      color: "gray.50",
      borderRadius: "lg",
      fontWeight: "bold",
      
      _hover: {
        bg: "black.100",
      },
      _active:{
        bg: "black.100",
      },
      _focus:{
        bg: "black.100",
      },
      _disabled:{
        bg: "black.100",
      }
    },
    "pushableBlack":{
      bg: "black.300",
      color: "gray.50",
      borderRadius: "lg",
      fontWeight: "bold",
      position: "relative",
      willChange: "transform",
      transform: "translateY(0px)",
      transition: "transform 100ms ease-in-out",
      _hover: {
        bg: "black.100",
        transform: "translateY(-2px)"
      },
      _active:{
        bg: "black.100",
        transform: "translateY(4px)",
        transition: "transform 34ms"
      },
      _focus:{
        bg: "black.100",
      },
      _disabled:{
        bg: "black.100",
      }
    }
  },
  defaultProps: {
    size: "",
    variant: "",
  },
}

export default buttonStyle;