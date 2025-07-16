import { useState } from 'react';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import AreaChart from './charts/AreaChart';
import PieChart from './charts/PieChart';
import ScatterPlot from './charts/ScatterPlot';
import DataInputForm from './components/DataInputForm';
import ChartSelector from './components/ChartSelector';

import './App.css';

const defaultData = [12, 45, 30, 80, 60, 90, 55];

function App() {
  const [data, setData] = useState(defaultData);
  const [selectedChart, setSelectedChart] = useState('line');

  const handleDataChange = newData => {
    setData(newData);
  };

  const handleChartChange = chartType => {
    setSelectedChart(chartType);
  };

  const renderChart = () => {
    const chartProps = {
      data,
      width: 650,
      height: 320,
    };

    switch (selectedChart) {
      case 'line':
        return <LineChart {...chartProps} />;
      case 'bar':
        return <BarChart {...chartProps} />;
      case 'area':
        return <AreaChart {...chartProps} />;
      case 'pie':
        return <PieChart {...chartProps} />;
      case 'scatter':
        return <ScatterPlot {...chartProps} />;
      default:
        return <LineChart {...chartProps} />;
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="controls-grid">
          <DataInputForm onDataChange={handleDataChange} />
          <ChartSelector selectedChart={selectedChart} onChartChange={handleChartChange} />
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">
              {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart
            </h2>
            <div className="chart-title-underline"></div>
          </div>

          {data.length > 0 ? (
            <div className="chart-display">{renderChart()}</div>
          ) : (
            <div className="no-data-placeholder">
              <div className="no-data-emoji">📊</div>
              Please enter some data to visualize your chart
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
