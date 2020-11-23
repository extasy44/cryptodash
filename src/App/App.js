import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import AppProvider from './AppProvider';
import Settings from '../Settings/Settings';
import Content from '../Shared/Content';

const App = () => {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <Settings />
        </Content>
      </AppProvider>
    </AppLayout>
  );
};

export default App;
