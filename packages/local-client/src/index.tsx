import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

import CellList from "./Components/cell-list";
// import TextEditor from "./Components/text-editor";
// import CodeCell from "./Components/code-cell";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
