import { SyntheticEvent } from 'react';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { NavItem } from '../dto/NavItem';
import { NAV_ITEMS } from '../util/MainMenu';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <Stack
      p={4}
      display={{ md: 'none' }}
      zIndex={9999}
      pos="fixed"
      top="60px"
      w={'full'}
      bg={'white'}
      minH={'calc(100vh - 60px)'}
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        // eslint-disable-next-line react-hooks/rules-of-hooks
        backgroundColor: useColorModeValue(
          'rgba(255, 255, 255, 0.8)',
          'rgba(26, 32, 44, 0.8)'
        ),
      }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          parentOnToggle={onToggle}
          key={navItem.label}
          navItem={navItem}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({
  parentOnToggle,
  navItem,
}: {
  parentOnToggle: () => void;
  navItem: NavItem;
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleToggle = (e: SyntheticEvent) => {
    if (navItem.children) {
      e.preventDefault();
      onToggle();
    }
  };

  const goTo = (e: any, href: string) => {
    e.preventDefault();
    parentOnToggle();
  };

  return (
    <Stack spacing={4} onClick={handleToggle}>
      <Flex
        py={2}
        as={Link}
        href={navItem.href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {navItem.label}
        </Text>
        {navItem.children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {navItem.children &&
            navItem.children.map((child) => (
              <Box
                href={child.href!}
                onClick={(e) => goTo(e, child.href!)}
                key={child.label}
                py={2}
                as={Link}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
