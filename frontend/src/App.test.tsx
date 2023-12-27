import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import App, { LocationDisplay } from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

test('full app', async () => {
  const view = render(
    <Provider store={store}>
      <App />
    </Provider>,
    { wrapper: BrowserRouter }
  );

  //eslint-disable-next-line
  // screen.debug(view.container);
  //eslint-disable-next-line
  screen.debug(view.container);
});
test('landing on a bad page', () => {
  const badRoute = '/some/bad/route';

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  // verify navigation to "no match" route
  expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
});

test('rendering a component that uses useLocation', () => {
  const route = '/';

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[route]}>
      <LocationDisplay />
    </MemoryRouter>
  );

  // verify location display is rendered
  expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});
