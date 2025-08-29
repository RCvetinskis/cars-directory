import './App.css';
import CarsList from './components/CarsList';
import PamirCarForm from './components/PamirCarForm';
import 'antd/dist/reset.css';
import { useState } from 'react';
import { Button, Space } from 'antd';

function App() {
  const [currentView, setCurrentView] = useState('list');

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ padding: '16px 24px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Space>
          <Button 
            type={currentView === 'list' ? 'primary' : 'default'}
            onClick={() => setCurrentView('list')}
          >
            Cars List
          </Button>
          <Button 
            type={currentView === 'pamir' ? 'primary' : 'default'}
            onClick={() => setCurrentView('pamir')}
          >
            Pamir Form
          </Button>
        </Space>
      </div>
      
      {currentView === 'list' && <CarsList />}
      {currentView === 'pamir' && <PamirCarForm />}
    </div>
  );
}

export default App;