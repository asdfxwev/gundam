import './App.css';
import Header from './header/Header'
import Main from './main/Main';
import Footer from './Footer/Footer';
import { LoginProvider } from './Login/LoginStatus';



function App() {

  return (
    <LoginProvider>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </LoginProvider>
  );

  // return (
  //   <div className="App" >
  //     <Header />
  //     <Main />
  //     <Footer />
  //   </div>
  // );
}

export default App;
