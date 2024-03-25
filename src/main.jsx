import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/inter"; // Defaults to weight 400
import {ProductProvider} from "./context/productContext.jsx"
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ProductProvider> */}
<Provider store={store}>
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition="Bounce"
/>
    <App />
    </Provider>
    {/* </ProductProvider> */}
  </React.StrictMode>,
)
