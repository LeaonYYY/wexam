import { useSelector } from 'react-redux';

const useUser = () => {
  //@ts-ignore
  return useSelector((state) => state.user);
};
export default useUser;
