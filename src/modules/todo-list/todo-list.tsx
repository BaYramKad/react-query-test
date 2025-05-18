import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useState, type FC } from 'react';
import { todoListApi, type TaskDto } from './api';

export const TodoList: FC = () => {
  const [enabled, setEnabled] = useState(false);
  const {
    data: todoItems,
    error,
    isPlaceholderData, // Это свойство указывает, что данные являются временными и еще не были загружены.
    isLoading, // это тоже самое что status
    fetchNextPage, // Функция для получения следующей страницы.
    hasNextPage, // Это свойство указывает, есть ли следующая страница.
    isFetchingNextPage, // Это свойство указывает, выполняется ли запрос на следующую страницу.
    // status, //  type QueryStatus = 'pending' | 'error' | 'success';
    // isPending, // true если данных в кеше нет
    // fetchStatus, //type FetchStatus = 'fetching' | 'paused' | 'idle';
  } = useInfiniteQuery({
    queryKey: ['tasks', 'promise-tasks'], // Ключ запроса, который будет использоваться для кэширования и синхронизации данных.
    queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
    initialPageParam: 1,
    getNextPageParam: (latePage) => latePage.next, // Функция для получения следующей страницы. Она будет вызвана, когда будет выполнен запрос на следующую страницу.
    enabled: enabled, // Это свойство указывает, что запрос будет выполнен только в том случае, если оно истинно. Для ленивых запросов.
    select: (data) => data.pages.flatMap((page) => page.data), // Функция для преобразования данных перед их использованием. Она будет вызвана, когда данные будут получены.
    // staleTime: 1000 * 60 * 1, // Время, в течение которого данные считаются свежими (в миллисекундах).
    // initialData: // Это начальные данные, которые будут отображаться до получения данных.
  });
  const cursorRef = useIntersacting(() => {
    fetchNextPage(); // Функция для получения следующей страницы. Она будет вызвана, когда элемент будет виден в области просмотра.
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // isPending определяет еслть ли в кеше данные если нет то статус panding

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='mx-auto w-1/2 mt-10 mb-10'>
      <h1 className='text-3xl font-bold mb-10'>Todo List</h1>
      <button onClick={() => setEnabled((e) => !e)}>Toggle Enabled</button>
      <div className={`${isPlaceholderData ? 'opacity-50' : ''}`}>
        {todoItems?.map((task: TaskDto) => {
          return (
            <div key={task.id} className='flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-md cursor-pointer'>
              <div className='flex items-center'>
                <input type='checkbox' checked={task.completed} readOnly className='mr-2' />
                <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={cursorRef} className='flex mt-5 border-t border-gray-300 pt-5'>
        {isFetchingNextPage && <div className='animate-pulse'>Loading more...</div>}
        {!hasNextPage && <div className='text-gray-500'>No more tasks</div>}
        {/* <button className=' bg-gray-300 px-5 py-3 cursor-pointer hover:bg-gray-400' onClick={() => setPage(1)}>
          First
        {/* <button className=' bg-gray-300 px-5 py-3 cursor-pointer hover:bg-gray-400' onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span className='px-5 py-3'>{page}</span>
        <button className='bg-gray-300 px-5 py-3 cursor-pointer hover:bg-gray-400' onClick={() => setPage((p) => Math.min(p + 1, todoItems.last))}>
          Next
        </button> */}
      </div>
    </div>
  );
};

function useIntersacting(onIntersect: () => void) {
  return useCallback((el: HTMLDivElement | null) => {
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
  }, []);
}
