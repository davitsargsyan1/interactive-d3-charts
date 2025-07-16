# 📊 Real-Time Interactive Charts

Dynamic data visualization with Socket.IO real-time updates, built with React, D3.js, and Node.js.

![Real-Time Charts](https://img.shields.io/badge/Real--Time-Charts-blue?style=for-the-badge&logo=react)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-green?style=for-the-badge&logo=socket.io)
![D3.js](https://img.shields.io/badge/D3.js-Visualization-orange?style=for-the-badge&logo=d3.js)

## ✨ Features

- **🔴 Real-Time Data Updates**: Live chart updates via Socket.IO every 3 seconds
- **📊 Multiple Chart Types**: Line, Bar, Area, Pie, and Scatter plots
- **📡 Data Source Control**: Switch between Sales, Temperature, Stock, and Random data
- **✏️ Custom Data Input**: Send custom data arrays in real-time
- **📝 Static Mode**: Traditional manual data input with preset options
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions
- **🎯 Consistent Design System**: Unified styling across all components
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and setup**:

```bash
git clone <your-repo-url>
cd charts
npm install
```

2. **Install backend dependencies**:

```bash
cd backend
npm install
cd ..
```

3. **Start both servers**:

```bash
npm run dev:full
```

This will start:

- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

### Alternative Start Methods

**Start servers separately**:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

**Production mode**:

```bash
# Backend
npm run start:backend

# Frontend
npm run build
npm run preview
```

## 🎯 Usage

### Real-Time Mode

1. Click **"🔴 Real-Time Mode"** (default)
2. **Select Data Source**: Choose from Sales, Temperature, Stock, or Random data
3. **Auto Updates**: Toggle automatic updates every 3 seconds
4. **Manual Refresh**: Click "🔄 Refresh Now" for instant updates
5. **Custom Data**: Enter comma-separated numbers to send custom data

### Static Mode

1. Click **"📝 Static Mode"**
2. Use the data input form to enter custom values
3. Try preset data options (Sales, Temperature, Stock, Sample)
4. Charts update immediately when data changes

### Chart Types

- **📈 Line Chart**: Perfect for time series and trend analysis
- **📊 Bar Chart**: Great for comparing categories
- **🏔️ Area Chart**: Shows cumulative data with filled areas
- **🥧 Pie Chart**: Displays proportions and percentages
- **🔵 Scatter Plot**: Individual data points with color coding

## 🔧 API Endpoints

The backend provides REST endpoints for external control:

### GET /api/status

Returns current server status:

```json
{
  "connectedClients": 2,
  "currentDataType": "sales",
  "autoUpdateActive": true,
  "availableDataTypes": ["sales", "temperature", "stock", "random"]
}
```

### POST /api/trigger-update

Manually trigger a data update:

```bash
curl -X POST http://localhost:3001/api/trigger-update
```

## 🏗️ Architecture

### Frontend Structure

```
src/
├── components/
│   ├── ChartSelector.jsx      # Chart type selection
│   ├── DataInputForm.jsx      # Static data input
│   └── RealTimeControls.jsx   # Socket.IO controls
├── charts/
│   ├── LineChart.jsx          # D3.js line chart
│   ├── BarChart.jsx           # D3.js bar chart
│   ├── AreaChart.jsx          # D3.js area chart
│   ├── PieChart.jsx           # D3.js pie chart
│   └── ScatterPlot.jsx        # D3.js scatter plot
├── hooks/
│   └── useSocket.js           # Socket.IO custom hook
└── App.jsx                    # Main application
```

### Backend Structure

```
backend/
├── server.js                  # Express + Socket.IO server
└── package.json              # Backend dependencies
```

## 🔌 Socket.IO Events

### Client → Server

- `changeDataType(dataType)`: Change data source
- `toggleAutoUpdate(enabled)`: Start/stop auto updates
- `refreshData()`: Request immediate data refresh
- `customData(array)`: Send custom data array

### Server → Client

- `chartData(payload)`: New chart data with metadata

```json
{
  "data": [12, 45, 30, 80, 60, 90, 55],
  "type": "sales",
  "label": "Sales Data",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Customization

### Adding New Data Types

1. **Backend** (`server.js`):

```javascript
const generateNewData = () => {
  return Array.from({ length: 7 }, () => /* your logic */);
};

const dataTypes = {
  // ...existing types
  newType: {
    generator: generateNewData,
    label: 'New Data Type',
    emoji: '🆕'
  }
};
```

2. **Frontend** (`RealTimeControls.jsx`):

```javascript
const dataTypes = [
  // ...existing types
  { key: 'newType', label: 'New Data Type', emoji: '🆕' },
];
```

### Custom Chart Types

Create new chart components in `src/charts/` following the existing pattern:

```javascript
const CustomChart = ({ data, width, height }) => {
  // D3.js implementation
  return <svg>...</svg>;
};
```

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start frontend dev server
- `npm run dev:backend`: Start backend dev server
- `npm run dev:frontend`: Start frontend only
- `npm run dev:full`: Start both servers with concurrently
- `npm run build`: Build for production
- `npm run lint`: Run ESLint

### Environment Variables

Create `.env` in the backend directory:

```
PORT=3001
CORS_ORIGIN=http://localhost:5173
UPDATE_INTERVAL=3000
```

## 📦 Dependencies

### Frontend

- **React** + **Vite**: Modern React development
- **D3.js**: Data visualization library
- **Socket.IO Client**: Real-time communication

### Backend

- **Express**: Web framework
- **Socket.IO**: WebSocket server
- **CORS**: Cross-origin resource sharing

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Upload dist/ folder
```

### Backend (Heroku/Railway)

```bash
cd backend
# Follow platform-specific deployment guides
```

**Important**: Update Socket.IO CORS origins for production!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **D3.js** community for amazing visualization examples
- **Socket.IO** team for real-time capabilities
- **React** team for the excellent framework

---

**Built with ❤️ using React, D3.js, and Socket.IO**
