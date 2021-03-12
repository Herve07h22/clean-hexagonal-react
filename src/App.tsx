import { withServices } from "./infrastructure/services";
import {Todos} from './presentation/Todos'

function App() {
  return (
    // Provide the client to your App
    <div>
      <Todos />
    </div>
  );
}

export default withServices(App);
