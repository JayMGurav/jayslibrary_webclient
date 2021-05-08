import { MotionBox } from "@/components/motionComponents"
import useScrollToTop from "@/hooks/useScrollToTop";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";


export default function Layout({children}) {
  const [isBtnVisible, scrollToTop] = useScrollToTop ();

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
      <IconButton 
        position="fixed"
        bottom="8"
        right="8"
        aria-label="Scrool to top" 
        isDisabled={!isBtnVisible}
        _disabled={{
          bg: "black.100",
          color: "black.10",
          cursor:"not-allowed"
        }}
        icon={<ChevronUpIcon />}
        onClick={scrollToTop} 
        size="md"
        variant="pushableBlue"
        isRound
      />
    </MotionBox>
  )
}