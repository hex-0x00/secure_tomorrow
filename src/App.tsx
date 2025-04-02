import React, { useState } from 'react';
import { Phone, Shield, MapPin, Send, AlertTriangle, ChevronRight, Heart, MessageCircle } from 'lucide-react';

function App() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const WHATSAPP_NUMBER = '919057301529';
  const EMERGENCY_NUMBER = '112';

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  const handleEmergencyCall = () => {
    window.location.href = `tel:${EMERGENCY_NUMBER}`;
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          
          // Share location via WhatsApp
          const mapsUrl = `https://www.google.com/maps?q=${newLocation.lat},${newLocation.lng}`;
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=My current location: ${mapsUrl}`;
          window.open(whatsappUrl, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    // Send incident report via SMS
    const smsBody = `Incident Report from ${name}: ${description}`;
    const smsUrl = `sms:${EMERGENCY_NUMBER}?body=${encodeURIComponent(smsBody)}`;
    window.location.href = smsUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-pink-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Secure Tomorrow</span>
            </div>
            <button
              onClick={handleEmergencyClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transform transition hover:scale-105 flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Call</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to make an emergency call?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmergencyCall}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Call Emergency ({EMERGENCY_NUMBER})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Safety Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Safety Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Stay Alert',
                description: 'Always be aware of your surroundings and trust your instincts.',
                icon: AlertTriangle,
              },
              {
                title: 'Share Location',
                description: 'Let trusted contacts know your location when traveling.',
                icon: MapPin,
              },
              {
                title: 'Emergency Contacts',
                description: 'Keep important numbers readily available.',
                icon: Phone,
              },
            ].map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <tip.icon className="w-8 h-8 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
                <ChevronRight className="w-5 h-5 text-pink-600 mt-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Location Sharing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Share Your Location</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={handleShareLocation}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Share Location via WhatsApp
            </button>
            {location && (
              <div className="mt-4">
                <p className="text-gray-600">
                  Your location: {location.lat}, {location.lng}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Report an Incident</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Incident Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Report via SMS
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center text-gray-500">
            <Heart className="w-5 h-5 mr-2 text-pink-600" />
            <p>Created with care for women's safety</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;