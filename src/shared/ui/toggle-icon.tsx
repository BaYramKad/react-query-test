// import type { TodoIcons } from '../types/icon-types';

const ActiveTaskIcon = () => {
  return (
    <svg viewBox="0 0 30 30" width={30} height={30}>
      <path d="M 15 3 C 8.3844276 3 3 8.3844276 3 15 C 3 21.615572 8.3844276 27 15 27 C 21.615572 27 27 21.615572 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 20.534692 20.534692 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 9.4653079 9.4653079 5 15 5 z" />
    </svg>
  );
};

const CompletedTaskIcon = () => {
  return (
    <svg viewBox="0 0 30 30" width={30} height={30}>
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21.707,12.707l-7.56,7.56 c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0 l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,12.316,21.707,12.707z" />
    </svg>
  );
};

export const ToggleTodo = ({
  isToggle,
  toggleChecked,
}: {
  isToggle: boolean;
  toggleChecked: () => void;
}) => {
  return (
    <>
      <input
        type="checkbox"
        checked={isToggle}
        className="cursor-pointer appearance-none"
        onChange={toggleChecked}
      />
      {isToggle ? <CompletedTaskIcon /> : <ActiveTaskIcon />}
    </>
  );
};
