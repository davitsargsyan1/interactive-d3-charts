import './ChartSelector.css';

const chartTypes = [
  { key: 'line', label: 'Line Chart', description: 'Shows trends over time', emoji: '📈' },
  { key: 'bar', label: 'Bar Chart', description: 'Compares different categories', emoji: '📊' },
  { key: 'area', label: 'Area Chart', description: 'Shows filled area under line', emoji: '🏔️' },
  { key: 'pie', label: 'Pie Chart', description: 'Shows proportions of a whole', emoji: '🥧' },
  {
    key: 'scatter',
    label: 'Scatter Plot',
    description: 'Shows individual data points',
    emoji: '🔵',
  },
];

const ChartSelector = ({ selectedChart, onChartChange }) => (
  <div className="chart-selector">
    <div className="chart-selector-header">
      <div className="chart-selector-emoji">🎨</div>
      <h3 className="chart-selector-title">Choose Chart Type</h3>
    </div>

    <div className="chart-types-grid">
      {chartTypes.map(chart => (
        <div
          key={chart.key}
          onClick={() => onChartChange(chart.key)}
          className={`chart-type-card ${selectedChart === chart.key ? 'selected' : ''}`}
        >
          <div className="chart-type-emoji">{chart.emoji}</div>
          <div className={`chart-type-label ${selectedChart === chart.key ? 'selected' : ''}`}>
            {chart.label}
          </div>
          <div className="chart-type-description">{chart.description}</div>

          {selectedChart === chart.key && <div className="selected-indicator">✓</div>}
        </div>
      ))}
    </div>

    {selectedChart && (
      <div className="selected-chart-display">
        <div className="selected-chart-info">
          <span className="selected-chart-emoji">🎯</span>
          <strong>Selected:</strong>
          {chartTypes.find(c => c.key === selectedChart)?.label}
        </div>
      </div>
    )}
  </div>
);

export default ChartSelector;
