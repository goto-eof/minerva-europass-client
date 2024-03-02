import {
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  PopoverContent,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { NavItem } from '../../dto/NavItem';
import { NAV_ITEMS } from '../../util/MainMenu';
import { useNavigate } from 'react-router';

export const DesktopNav = () => {
  return (
    <Stack direction="row" spacing={4} display={{ base: 'none', md: 'flex' }}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} cursor={'pointer'}>
          <Popover trigger="hover" placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  textDecoration: 'none',
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color: useColorModeValue('gray.800', 'white'),
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} navItem={child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ navItem }: { navItem: NavItem }) => {
  const navigate = useNavigate();
  const goToView = (href: string) => {
    navigate(href);
  };
  return (
    <Box
      role={'group'}
      display={'block'}
      cursor={'pointer'}
      p={2}
      onClick={() => goToView(navItem.href!)}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}
          >
            {navItem.label}
          </Text>
          <Text fontSize={'sm'}>{navItem.subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};
