import { ChakraProvider, Box, theme, Container } from '@chakra-ui/react';

import Header from './layout/Header';
import { Route, Routes } from 'react-router';
import About from './About';
import Home from './Home';
import Resume from './Resume';
import { HashRouter } from 'react-router-dom';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HashRouter>
          <Header />
          <Container maxW={'7xl'} marginTop={'64px'} textAlign={'justify'}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/fill-up-resume" element={<Resume />} />
            </Routes>
          </Container>
        </HashRouter>
      </Box>
    </ChakraProvider>
  );
};
