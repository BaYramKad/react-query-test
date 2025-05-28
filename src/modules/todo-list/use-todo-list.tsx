import { useQuery } from '@tanstack/react-query';

import { todoListApi } from './api';

export const useTodoList = () => {
  //   const [enabled, setEnabled] = useState(false);
  const {
    data: todoItems,
    error,
    // isPlaceholderData, // Это свойство указывает, что данные являются временными и еще не были загружены.
    isLoading, // это тоже самое что status
    // Это свойство указывает, выполняется ли запрос на следующую страницу.
    // status, //  type QueryStatus = 'pending' | 'error' | 'success';
    // isPending, // true если данных в кеше нет
    // fetchStatus, //type FetchStatus = 'fetching' | 'paused' | 'idle';
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(), // Получаем опции для бесконечного запроса.
    // enabled: enabled, // Это свойство указывает, что запрос будет выполнен только в том случае, если оно истинно. Для ленивых запросов.
    // Функция для преобразования данных перед их использованием. Она будет вызвана, когда данные будут получены.
    select: (data) => data.toReversed(),
  });

  return {
    todoItems,
    error,
    isLoading,
  };
};

// function useIntersacting(onIntersect: () => void) {
//   return useCallback(
//     (el: HTMLDivElement | null) => {
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             onIntersect();
//           }
//         });
//       });
//       if (el) {
//         observer.observe(el);
//       }
//       return () => observer.disconnect();
//     },
//     [onIntersect]
//   );
// }
