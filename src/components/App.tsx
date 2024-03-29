import { ChakraProvider, Box, theme, Container } from '@chakra-ui/react';

import Header from './layout/Header';
import { Route, Routes } from 'react-router';
import About from './About';
import Home from './Home';
import Resume from './resume/Resume';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { resumeStore } from './store/store';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={resumeStore}>
        <Box textAlign="center" w={'full'} fontSize="xl">
          <HashRouter>
            <Header />
            <Box w={'full'} marginTop={'64px'} textAlign={'justify'}>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Home />} />
                <Route path="/fill-up-resume" element={<Resume />} />
              </Routes>
            </Box>
          </HashRouter>
        </Box>
      </Provider>
    </ChakraProvider>
  );
};
