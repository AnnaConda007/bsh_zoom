import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
 	const autosaveTime = 604800;
  useEffect(() => {
    const isExpired = 1;
    if (!isExpired || isExpired >= autosaveTime) {
    navigate("Authorization");
  }
}, []);

return <p>календарь</p>;
};
export default Home;
