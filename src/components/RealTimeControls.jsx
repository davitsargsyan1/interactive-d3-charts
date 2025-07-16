import './RealTimeControls.css';

const RealTimeControls = ({ isRealTimeActive, onToggleRealTime, onResetData, dataLength }) => {
  return (
    <div className="realtime-controls">
      <div className="realtime-controls-header">
        <div className="realtime-controls-emoji">⚡</div>
        <h3 className="realtime-controls-title">Real-Time Data</h3>
      </div>

      <div className="realtime-status">
        <div className={`status-indicator ${isRealTimeActive ? 'active' : 'inactive'}`}>
          <div className="status-dot"></div>
          <span className="status-text">{isRealTimeActive ? 'Streaming Live' : 'Stopped'}</span>
        </div>
        <div className="data-count">{dataLength} data points</div>
      </div>

      <div className="realtime-buttons">
        <button className={`realtime-toggle-btn `} onClick={onToggleRealTime}>
          <span className="btn-icon">{isRealTimeActive ? '⏸️' : '▶️'}</span>
          {isRealTimeActive ? 'Stop Stream' : 'Start Stream'}
        </button>

        <button className="realtime-reset-btn" onClick={onResetData} disabled={isRealTimeActive}>
          <span className="btn-icon">🔄</span>
          Reset Data
        </button>
      </div>

      <div className="realtime-info">
        <div className="info-item">
          <span className="info-label">Update Rate:</span>
          <span className="info-value">100ms</span>
        </div>
        <div className="info-item">
          <span className="info-label">Max Points:</span>
          <span className="info-value">20</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeControls;
