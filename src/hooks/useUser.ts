import { useSelector } from 'react-redux';

const useUser = () => {
  return userSelector((state) => state.user);
};
export default useUser;
