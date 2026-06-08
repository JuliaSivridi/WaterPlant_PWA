import { useState, useEffect } from 'react';

export default function PlantModal({ plant, onSave, onDelete, onClose }) {
  const isEdit = Boolean(plant);
  const [name, setName] = useState('');
  const [freqValue, setFreqValue] = useState(7);
  const [freqUnit, setFreqUnit] = useState('days');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setFreqValue(plant.frequencyValue);
      setFreqUnit(plant.frequencyUnit);
    }
  }, [plant]);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Введите название';
    if (!freqValue || freqValue < 1 || freqValue > 365) e.freqValue = 'От 1 до 365';
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ name: name.trim(), frequencyValue: Number(freqValue), frequencyUnit: freqUnit });
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  if (confirmDelete) {
    return (
      <div className="modal-backdrop" onClick={handleBackdrop}>
        <div className="modal">
          <h2 className="modal-title">Удалить растение?</h2>
          <p className="modal-text">«{plant.name}» будет удалено без возможности восстановления.</p>
          <div className="modal-actions">
            <button className="btn btn--text" onClick={() => setConfirmDelete(false)}>Отмена</button>
            <button className="btn btn--danger" onClick={onDelete}>Удалить</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal">
        <h2 className="modal-title">{isEdit ? 'Редактировать' : 'Новое растение'}</h2>

        <div className="form-field">
          <label className="form-label">Название</label>
          <input
            className={`form-input${errors.name ? ' form-input--error' : ''}`}
            value={name}
            onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
            placeholder="Например: Фикус"
            autoFocus
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">Периодичность полива</label>
          <div className="freq-row">
            <input
              className={`form-input freq-input${errors.freqValue ? ' form-input--error' : ''}`}
              type="number"
              min={1}
              max={365}
              value={freqValue}
              onChange={e => { setFreqValue(e.target.value); setErrors(p => ({ ...p, freqValue: '' })); }}
            />
            <div className="freq-unit-toggle">
              <button
                className={`freq-unit-btn${freqUnit === 'days' ? ' freq-unit-btn--active' : ''}`}
                onClick={() => setFreqUnit('days')}
              >дни</button>
              <button
                className={`freq-unit-btn${freqUnit === 'weeks' ? ' freq-unit-btn--active' : ''}`}
                onClick={() => setFreqUnit('weeks')}
              >недели</button>
            </div>
          </div>
          {errors.freqValue && <span className="form-error">{errors.freqValue}</span>}
        </div>

        <div className="modal-actions">
          {isEdit && (
            <button className="btn btn--text btn--danger-text" onClick={() => setConfirmDelete(true)}>
              Удалить
            </button>
          )}
          <div className="modal-actions-right">
            <button className="btn btn--text" onClick={onClose}>Отмена</button>
            <button className="btn btn--filled" onClick={handleSave}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
