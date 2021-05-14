import {
  Box, Flex, Heading, Link, Image as ChakraImg , LinkBox, Text,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import Image from 'next/image'

export const MotionBox = motion(Box);

export const MotionFlex = motion(Flex);

export const MotionLinkBox = motion(LinkBox);

export const MotionNextImage = motion(Image);
export const MotionChakraImage = motion(ChakraImg);
export const MotionLink = motion(Link);
export const MotionText = motion(Text);
export const MotionHeading = motion(Heading);
