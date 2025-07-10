import { useDispatch } from "react-redux";
import { loaderActive, loaderPasive } from "../features/loader/loaderSlice";

const usePageLoader = () => {
  const dispatch = useDispatch();

  const showPageLoader = () => dispatch(loaderActive());
  const hidePageLoader = () => dispatch(loaderPasive());

  return { showPageLoader, hidePageLoader };
};

export default usePageLoader;
