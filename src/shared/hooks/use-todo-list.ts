import { useSuspenseQuery } from '@tanstack/react-query';

import { todoListApi } from '../../api/todo-list-api';
import { useSuspenseUser } from './use-user';

export const useTodoList = () => {
  //   const [enabled, setEnabled] = useState(false)
  const user = useSuspenseUser();
  const {
    data: todoItems,
    // error,
    // isPlaceholderData, // Это свойство указывает, что данные являются временными и еще не были загружены.
    // isLoading, // это тоже самое что status
    // Это свойство указывает, выполняется ли запрос на следующую страницу.
    // status, //  type QueryStatus = 'pending' | 'error' | 'success';
    // isPending, // true если данных в кеше нет
    // fetchStatus, //type FetchStatus = 'fetching' | 'paused' | 'idle';
  } = useSuspenseQuery({
    ...todoListApi.getTodoListQueryOptions(user.data.id), // Получаем опции для бесконечного запроса.
    // enabled: enabled, // Это свойство указывает, что запрос будет выполнен только в том случае, если оно истинно. Для ленивых запросов.
    // Функция для преобразования данных перед их использованием. Она будет вызвана, когда данные будут получены.
    select: (data) => data.toReversed(),
  });

  return {
    todoItems,
  };
};

// ВАЖНО
// useSuspenseQuery - любые способы запросов будь то в useEffect или useQuery они будут выполнятся паралельно
// но не с useSuspenseQuery он запросы выполняет последовательно это ботерфолд = решение использовать
// queryClient.prefetchQuery(todoListApi.getTodoListQueryOptions(user.data.id)) префетчинг
// это запустит наши запросы паралельно к томо же паралельно рендерингу компонента это даже быстрее чем useEffect
// и если использовать роутинг в виде объектов и массивов то делать префетчинг лучше внутри свойства loader

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
