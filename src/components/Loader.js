import { useSelector } from "react-redux";
import epiasLogo from '../assets/epias-logo.jpg'

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loader-backdrop">
      <img 
      src={epiasLogo} 
      alt="Loading..." 
      className="loader-image"/>
    </div>
  );
};

export default Loader;
