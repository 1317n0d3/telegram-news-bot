import React from "react";
import { createRoot } from "react-dom/client";
import ChannelListPage from "./components/ChannelListPage";

const App = () => {
  return <ChannelListPage />
}

const root = createRoot(document.body);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
