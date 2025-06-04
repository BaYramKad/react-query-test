import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { queryClient } from '../shared/ui/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '../shared/redux';
import { Provider } from 'react-redux';
import { LoaderSuspense } from '../shared/LoaderSuspense';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode>
        <LoaderSuspense>
          <App />
        </LoaderSuspense>
      </StrictMode>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
