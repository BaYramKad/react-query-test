import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { todoListApi } from './api';

export const useTodoList = () => {
  //   const [enabled, setEnabled] = useState(false);
  const {
    data: todoItems,
    error,
    // isPlaceholderData, // Это свойство указывает, что данные являются временными и еще не были загружены.
    isLoading, // это тоже самое что status
    fetchNextPage, // Функция для получения следующей страницы.
    hasNextPage, // Это свойство указывает, есть ли следующая страница.
    isFetchingNextPage, // Это свойство указывает, выполняется ли запрос на следующую страницу.
    // status, //  type QueryStatus = 'pending' | 'error' | 'success';
    // isPending, // true если данных в кеше нет
    // fetchStatus, //type FetchStatus = 'fetching' | 'paused' | 'idle';
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfinityQueryOptions(), // Получаем опции для бесконечного запроса.
    // enabled: enabled, // Это свойство указывает, что запрос будет выполнен только в том случае, если оно истинно. Для ленивых запросов.
    select: (data) => data.pages.flatMap((page) => page.data), // Функция для преобразования данных перед их использованием. Она будет вызвана, когда данные будут получены.
  });
  const cursorRef = useIntersacting(() => {
    fetchNextPage(); // Функция для получения следующей страницы. Она будет вызвана, когда элемент будет виден в области просмотра.
  });

  const nextListIsEmpty = (
    <div ref={cursorRef} className='flex mt-5 border-t border-gray-300 pt-5'>
      {isFetchingNextPage && <div className='animate-pulse'>Loading more...</div>}
      {!hasNextPage && <div className='text-gray-500'>No more tasks</div>}
    </div>
  );

  return {
    todoItems,
    error,
    isLoading,
    nextListIsEmpty,
  };
};

function useIntersacting(onIntersect: () => void) {
  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      });
      if (el) {
        observer.observe(el);
      }
      return () => observer.disconnect();
    },
    [onIntersect]
  );
}
