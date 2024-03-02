import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Container,
  Stack,
  IconButton,
  useColorModeValue,
  Icon,
  Heading,
  useDisclosure,
  useColorMode,
  Link,
} from '@chakra-ui/react';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IoDocument, IoGlobe, IoLogoEuro, IoMoon } from 'react-icons/io5';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { useNavigate } from 'react-router';
export default function Header() {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  const goTo = (href: string) => {
    navigate(href);
  };

  return (
    <Box as="header">
      <Flex
        as={'header'}
        pos="fixed"
        top="0"
        w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex="999"
        justify={'center'}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue(
            'rgba(255, 255, 255, 0.8)',
            'rgba(26, 32, 44, 0.8)'
          ),
        }}
      >
        <Container as={Flex} maxW={'7xl'} align={'center'}>
          <Flex
            flex={{ base: '0', md: 'auto' }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isMobileNavOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              size={'sm'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>

          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'start', md: 'start' }}
          >
            <Stack
              cursor={'pointer'}
              direction="row"
              alignItems="center"
              spacing={{ base: 2, sm: 4 }}
              onClick={() => goTo('/')}
            >
              <Icon as={IoGlobe} w={{ base: 8 }} h={{ base: 8 }} />
              <Heading
                as={'h1'}
                fontSize={'xl'}
                display={{ base: 'block', md: 'block' }}
              >
                Minerva Europass
              </Heading>
            </Stack>
          </Flex>

          <Stack
            direction={'row'}
            align={'center'}
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: 'auto' }}
            justify={'flex-end'}
          >
            <DesktopNav />
            <ColorModeSwitcher />
          </Stack>
        </Container>
      </Flex>
      <MobileNav onToggle={onToggle} isOpen={isMobileNavOpen} />
    </Box>
  );
}
