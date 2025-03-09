import React from 'react';
import Layout from './pages/Layout';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout />} ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
