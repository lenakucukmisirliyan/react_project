import { useDispatch } from "react-redux";
import { loaderActive, loaderPassive } from "../features/loader/loaderSlice";

const usePageLoader = () => {
  const dispatch = useDispatch();

  const showPageLoader = () => dispatch(loaderActive());
  const hidePageLoader = () => dispatch(loaderPassive());

  return { showPageLoader, hidePageLoader };
};

export default usePageLoader;
