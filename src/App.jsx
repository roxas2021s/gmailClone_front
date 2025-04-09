import HomePage from "./Router/HomePage";
import Register from "./Component/Register";
import { useSelector } from "react-redux";



function App() {

 const token = useSelector(store => store.appSlice.token);

  return (
    <div>
       {
        token ? (
          <HomePage/>
        ):(
          <Register/>
        )
       }
    </div>
  )
 

}


export default App;
