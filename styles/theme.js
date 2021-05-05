import { extendTheme } from "@chakra-ui/react"
import buttonStyle from "./button.style"
// import inputStyle from "./input.style";

export default extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        fontFamily: "Poppins",
        background: '#f1f3f5',
        color: "#49545B",
      },
      h1: {
        color: "#374045",
      }
    },
  },
  fonts: {
    body: "Poppins",
    serif: "sans-serif"
  },
  components: {
    Button: buttonStyle,
    // Input: inputStyle
  },
  colors: {
    brand: {
      50: "teal.50",
      100: "teal.100",
      200: "teal.200",
    },
  },
})