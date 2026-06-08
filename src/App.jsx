import { useState, useRef } from 'react';
import usePlants from './hooks/usePlants';
import PlantList from './components/PlantList';
import PlantModal from './components/PlantModal';
import { exportData, importData } from './utils/backup';
import './App.css';

export default function App() {
  const { plants, addPlant, updatePlant, deletePlant, toggleWatered, replacePlants } = usePlants();
  const [modalPlant, setModalPlant] = useState(undefined); // undefined=closed, null=new, plant=edit
  const [menuOpen, setMenuOpen] = useState(false);
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef(null);

  function handleSave({ name, frequencyValue, frequencyUnit }) {
    if (modalPlant) {
      updatePlant(modalPlant.id, { name, frequencyValue, frequencyUnit });
    } else {
      addPlant(name, frequencyValue, frequencyUnit);
    }
    setModalPlant(undefined);
  }

  function handleDelete() {
    deletePlant(modalPlant.id);
    setModalPlant(undefined);
  }

  async function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await importData(file);
      replacePlants(data);
      setMenuOpen(false);
    } catch (err) {
      setImportError(err.message);
    }
    e.target.value = '';
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌿 Watering</h1>
        <div className="menu-container">
          <button className="icon-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          {menuOpen && (
            <>
              <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="menu">
                <button className="menu-item" onClick={() => { exportData(plants); setMenuOpen(false); }}>
                  <span className="material-symbols-outlined">download</span>
                  Export data
                </button>
                <button className="menu-item" onClick={() => fileInputRef.current.click()}>
                  <span className="material-symbols-outlined">upload</span>
                  Import data
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        <PlantList
          plants={plants}
          onNameClick={plant => setModalPlant(plant)}
          onDayToggle={toggleWatered}
        />
      </main>

      <button className="fab" onClick={() => setModalPlant(null)} aria-label="Add plant">
        <span className="material-symbols-outlined">add</span>
      </button>

      {modalPlant !== undefined && (
        <PlantModal
          plant={modalPlant}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalPlant(undefined)}
        />
      )}

      {importError && (
        <div className="toast toast--error">
          <span>{importError}</span>
          <button onClick={() => setImportError('')} className="toast-close">✕</button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleImportFile}
      />
    </div>
  );
}
