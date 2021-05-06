import { extendTheme } from "@chakra-ui/react"
import buttonStyle from "./button.style"

export default extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "sans-serif",
        background: '#f1f3f5',
        color: "#49545B",
        overflowY: "none"
      },
      h1: {
        color: "#374045",
      }
    },
  },
  components: {
    Button: buttonStyle,
  },
})