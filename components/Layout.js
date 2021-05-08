import { MotionBox } from "@/components/motionComponents"


export default function Layout({children}) {
  return(
    <MotionBox 
      w="100%" 
      maxW="1200px" 
      mx="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      exit={{ opacity: 0 }}
      px="4"
    >
      {children}
    </MotionBox>
  )
}