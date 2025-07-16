import { useState } from 'react';

import './DataInputForm.css';

const presets = [
  { key: 'sales', label: 'Sales Data', emoji: '💰' },
  { key: 'temperature', label: 'Temperature', emoji: '🌡️' },
  { key: 'stock', label: 'Stock Prices', emoji: '📈' },
  { key: 'default', label: 'Sample Data', emoji: '📊' },
];

const DataInputForm = ({ onDataChange }) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const parsedData = inputValue
      .split(',')
      .map(item => parseFloat(item.trim()))
      .filter(num => !isNaN(num) && num > 0);

    if (parsedData.length > 0) {
      setData(parsedData);
      onDataChange(parsedData);
    }
  };

  const handlePresetData = preset => {
    let presetData;
    switch (preset) {
      case 'sales':
        presetData = [120, 190, 300, 500, 200, 300, 450];
        break;
      case 'temperature':
        presetData = [20, 25, 30, 28, 22, 18, 15];
        break;
      case 'stock':
        presetData = [100, 120, 90, 150, 200, 180, 220];
        break;
      default:
        presetData = [12, 45, 30, 80, 60, 90, 55];
    }

    setInputValue(presetData.join(', '));
    setData(presetData);
    onDataChange(presetData);
  };

  return (
    <div className="data-input-form">
      <div className="data-input-header">
        <div className="data-input-emoji">📝</div>
        <h3 className="data-input-title">Enter Your Data</h3>
      </div>

      <form onSubmit={handleSubmit} className="data-input-form-element">
        <div className="data-input-field">
          <label className="data-input-label">Data Values (comma-separated numbers)</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="e.g., 12, 45, 30, 80, 60, 90, 55"
            className="data-input-text"
          />
        </div>

        <button type="submit" className="data-input-submit">
          Update Chart
        </button>
      </form>

      <div>
        <p className="preset-section-label">Or try preset data:</p>
        <div className="preset-buttons-grid">
          {presets.map(preset => (
            <button
              key={preset.key}
              onClick={() => handlePresetData(preset.key)}
              className="preset-button"
            >
              <span className="preset-emoji">{preset.emoji}</span>
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {data.length > 0 && (
        <div className="current-data-display">
          <div className="current-data-header">
            <span className="current-data-checkmark">✅</span>
            <strong>Current Data:</strong>
          </div>
          <div className="current-data-values">[{data.join(', ')}]</div>
        </div>
      )}
    </div>
  );
};

export default DataInputForm;
