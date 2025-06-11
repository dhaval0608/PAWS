import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Leaf, Smartphone, Bell, User, QrCode, ArrowLeft, Droplets, Thermometer, Eye, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'

// Mock data for plants
const mockPlants = [
  {
    id: 1,
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    moisture: 75,
    temperature: 22,
    humidity: 65,
    light: "Good",
    lastWatered: "2h ago",
    status: "good",
    image: "🌿"
  },
  {
    id: 2,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    moisture: 45,
    temperature: 20,
    humidity: 55,
    light: "Low",
    lastWatered: "4h ago",
    status: "warning",
    image: "🌱"
  },
  {
    id: 3,
    name: "Monstera",
    scientificName: "Monstera deliciosa",
    moisture: 85,
    temperature: 24,
    humidity: 70,
    light: "Bright",
    lastWatered: "1h ago",
    status: "good",
    image: "🍃"
  },
  {
    id: 4,
    name: "Bird of Paradise",
    scientificName: "Strelitzia reginae",
    moisture: 30,
    temperature: 26,
    humidity: 60,
    light: "Bright",
    lastWatered: "6h ago",
    status: "error",
    image: "🌺"
  }
]

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Moisture Alert",
    message: "Bird of Paradise needs watering",
    time: "5 min ago",
    read: false
  },
  {
    id: 2,
    type: "success",
    title: "Watering Complete",
    message: "Monstera has been watered successfully",
    time: "1h ago",
    read: false
  },
  {
    id: 3,
    type: "info",
    title: "Device Connected",
    message: "New P.A.W.S device registered",
    time: "2h ago",
    read: true
  }
]

// Plant Card Component
function PlantCard({ plant, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'status-good'
      case 'warning': return 'status-warning'
      case 'error': return 'status-error'
      default: return 'status-good'
    }
  }

  const getMoistureColor = (moisture) => {
    if (moisture >= 70) return '#4CAF50'
    if (moisture >= 40) return '#FF9800'
    return '#F44336'
  }

  return (
    <Card className="plant-card cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
            {plant.image}
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-sm">{plant.name}</h3>
            <div className="flex items-center justify-center mt-2">
              <div 
                className="moisture-circle flex items-center justify-center text-xs font-bold"
                style={{
                  background: `conic-gradient(${getMoistureColor(plant.moisture)} ${plant.moisture * 3.6}deg, #E8E8E8 ${plant.moisture * 3.6}deg)`
                }}
              >
                {plant.moisture}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last watered: {plant.lastWatered}</p>
            <div className="flex items-center justify-center mt-1">
              <span className={`status-dot ${getStatusColor(plant.status)} mr-1`}></span>
              <span className="text-xs text-gray-600 capitalize">{plant.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Bottom Navigation Component
function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'plants', icon: Leaf, label: 'Plants' },
    { id: 'devices', icon: Smartphone, label: 'Devices' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' }
  ]

  return (
    <div className="bottom-nav">
      <div className="flex justify-around items-center px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-[#2D5A27]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Dashboard Screen
function Dashboard({ plants, onPlantClick }) {
  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2D5A27]">Welcome, Emma</h1>
          <p className="text-gray-600">Your plants are looking great!</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-[#2D5A27]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-[#2D5A27]">{plants.length}</div>
            <div className="text-xs text-gray-600">Plants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-[#4CAF50]">{plants.filter(p => p.status === 'good').length}</div>
            <div className="text-xs text-gray-600">Healthy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-[#FF9800]">{plants.filter(p => p.status !== 'good').length}</div>
            <div className="text-xs text-gray-600">Need Care</div>
          </CardContent>
        </Card>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-2 gap-4">
        {plants.map((plant) => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onClick={() => onPlantClick(plant)}
          />
        ))}
      </div>
    </div>
  )
}

// Plant Details Screen
function PlantDetails({ plant, onBack }) {
  if (!plant) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-[#2D5A27]" />
        </button>
        <h1 className="text-lg font-semibold">Plant Details</h1>
      </div>

      {/* Plant Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center text-8xl">
        {plant.image}
      </div>

      {/* Plant Info */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#2D5A27] mb-1">{plant.name}</h2>
        <p className="text-gray-600 italic mb-6">{plant.scientificName}</p>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Moisture</div>
              <div className="text-xl font-bold">{plant.moisture}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-xl font-bold">{plant.temperature}°C</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="text-xl font-bold">{plant.humidity}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Light</div>
              <div className="text-xl font-bold">{plant.light}</div>
            </CardContent>
          </Card>
        </div>

        {/* Care Information */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-[#2D5A27]" />
              Care Information
            </h3>
            <p className="text-sm text-gray-600">
              Water when the soil's top inch feels dry, about once a week. 
              Ensure good drainage and avoid overwatering.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-[#2D5A27] hover:bg-[#1f3f1b]">
            Water Now
          </Button>
          <Button variant="outline" className="w-full border-[#2D5A27] text-[#2D5A27]">
            View History
          </Button>
        </div>
      </div>
    </div>
  )
}

// QR Scanner Screen
function QRScanner({ onBack }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Scanner Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-xl font-semibold mb-8 text-center">
          Scan QR code on your P.A.W.S device
        </h2>
        
        {/* Scanner Frame */}
        <div className="relative">
          <div className="w-64 h-64 border-2 border-[#2D5A27] rounded-lg relative">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#2D5A27] rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#2D5A27] rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#2D5A27] rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#2D5A27] rounded-br-lg"></div>
            
            {/* QR Code placeholder */}
            <div className="absolute inset-4 bg-white rounded flex items-center justify-center">
              <QrCode className="w-32 h-32 text-black" />
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="mt-8 text-white border-white hover:bg-white hover:text-black"
        >
          Enter manually
        </Button>
      </div>
    </div>
  )
}

// Notifications Screen
function Notifications({ notifications }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <Bell className="w-5 h-5 text-orange-500" />
      case 'success': return <Droplets className="w-5 h-5 text-green-500" />
      case 'info': return <Smartphone className="w-5 h-5 text-blue-500" />
      default: return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-[#2D5A27] mb-6">Notifications</h1>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-[#2D5A27]' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-[#2D5A27] rounded-full"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Devices Screen
function DevicesScreen({ onScanQR }) {
  const devices = [
    { id: 1, name: "P.A.W.S Device #001", plant: "Fiddle Leaf Fig", battery: 85, signal: "Strong" },
    { id: 2, name: "P.A.W.S Device #002", plant: "Snake Plant", battery: 92, signal: "Good" },
    { id: 3, name: "P.A.W.S Device #003", plant: "Monstera", battery: 67, signal: "Weak" }
  ]

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2D5A27]">Devices</h1>
        <Button 
          onClick={onScanQR}
          className="bg-[#2D5A27] hover:bg-[#1f3f1b]"
          size="sm"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Scan QR
        </Button>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <Card key={device.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className="text-sm text-gray-600">Connected to: {device.plant}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Battery: {device.battery}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        device.signal === 'Strong' ? 'bg-green-500' :
                        device.signal === 'Good' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-xs text-gray-600">Signal: {device.signal}</span>
                    </div>
                  </div>
                </div>
                <Smartphone className="w-8 h-8 text-[#2D5A27]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Plants Library Screen
function PlantsLibrary() {
  const plantLibrary = [
    { id: 1, name: "Fiddle Leaf Fig", difficulty: "Medium", category: "Indoor", image: "🌿" },
    { id: 2, name: "Snake Plant", difficulty: "Easy", category: "Indoor", image: "🌱" },
    { id: 3, name: "Monstera", difficulty: "Easy", category: "Indoor", image: "🍃" },
    { id: 4, name: "Bird of Paradise", difficulty: "Hard", category: "Indoor", image: "🌺" },
    { id: 5, name: "Peace Lily", difficulty: "Easy", category: "Indoor", image: "🌸" },
    { id: 6, name: "Rubber Plant", difficulty: "Medium", category: "Indoor", image: "🌳" }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-[#2D5A27] mb-6">Plant Library</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {plantLibrary.map((plant) => (
          <Card key={plant.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {plant.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{plant.name}</h3>
                  <p className="text-sm text-gray-600">{plant.category}</p>
                  <Badge className={`mt-2 ${getDifficultyColor(plant.difficulty)}`}>
                    {plant.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Profile Screen
function Profile() {
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-[#2D5A27] mb-6">Profile</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-[#2D5A27] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            E
          </div>
          <h2 className="text-xl font-semibold">Emma Johnson</h2>
          <p className="text-gray-600">Plant Enthusiast</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">Notifications</button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">Device Management</button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">Account Settings</button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Support</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">Help Center</button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">Contact Support</button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">About P.A.W.S</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [showQRScanner, setShowQRScanner] = useState(false)

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant)
  }

  const handleBackToMain = () => {
    setSelectedPlant(null)
    setShowQRScanner(false)
  }

  const handleScanQR = () => {
    setShowQRScanner(true)
  }

  // Show QR Scanner
  if (showQRScanner) {
    return (
      <div className="mobile-container">
        <QRScanner onBack={handleBackToMain} />
      </div>
    )
  }

  // Show Plant Details
  if (selectedPlant) {
    return (
      <div className="mobile-container">
        <PlantDetails plant={selectedPlant} onBack={handleBackToMain} />
      </div>
    )
  }

  // Main App with Bottom Navigation
  return (
    <div className="mobile-container">
      {/* Main Content */}
      <div className="min-h-screen">
        {activeTab === 'dashboard' && (
          <Dashboard plants={mockPlants} onPlantClick={handlePlantClick} />
        )}
        {activeTab === 'plants' && <PlantsLibrary />}
        {activeTab === 'devices' && <DevicesScreen onScanQR={handleScanQR} />}
        {activeTab === 'notifications' && <Notifications notifications={mockNotifications} />}
        {activeTab === 'profile' && <Profile />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App

