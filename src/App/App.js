import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import AppProvider from './AppProvider';

const App = () => {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        Crypto Dashboard
      </AppProvider>
    </AppLayout>
  );
};

export default App;
