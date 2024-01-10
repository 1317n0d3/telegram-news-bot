import React from "react";
import { createRoot } from "react-dom/client";
import ChannelListPage from "./components/ChannelListPage";

const App = () => {
  return <ChannelListPage />
}

const root = createRoot(document.querySelector("#root"));
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
