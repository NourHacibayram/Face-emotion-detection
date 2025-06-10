
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

// Team member data
const teamMembers = [
  {
    name: 'Nour Hacıbayram',
    role: 'Makine Öğrenmesi Mühendisi',
    initials: 'NH',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format',
    bgGradient: 'bg-gradient-to-br from-emotion-primary/20 to-emotion-secondary/50'
  },
  {
    name: 'Abdulselam Hardan',
    role: 'Frontend Geliştirici',
    initials: 'AH',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format',
    bgGradient: 'bg-gradient-to-br from-emotion-secondary/20 to-emotion-accent/50'
  },
  {
    name: 'Mohamad Abdullah Yahia',
    role: 'UX/UI Tasarımcı',
    initials: 'MY',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format',
    bgGradient: 'bg-gradient-to-br from-emotion-accent/20 to-emotion-primary/50'
  }
];

// Supported emotions data
const supportedEmotions = [
  { name: 'Kızgın', emoji: '😠' },
  { name: 'Mutlu', emoji: '😊' },
  { name: 'Doğal', emoji: '😐' },
  { name: 'Üzgün', emoji: '😢' },
  { name: 'Şaşkın', emoji: '😲' },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emotion-light/30 px-4 py-8">
      {/* Header section */}
      <header className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            ← Ana Sayfaya Dön
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Ekibimiz ile Tanışın
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bu duygu tanıma projesinin arkasındaki makine öğrenmesi, frontend geliştirme ve kullanıcı deneyimi tasarımı 
          konusunda uzmanlıklarını birleştiren yetenekli bireyler.
        </p>
      </header>

      {/* Team members section - enhanced with square images */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {teamMembers.map((member, index) => (
          <Card 
            key={index} 
            className={`emotion-card shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${member.bgGradient}`}
          >
            {/* Square image container with cool effects */}
            <div className="aspect-[1/1] w-full overflow-hidden relative">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emotion-primary/30">
                  <span className="text-5xl font-bold text-white">{member.initials}</span>
                </div>
              )}
              {/* Cool overlays and effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-4 border-white/10 m-3 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Member info */}
            <CardContent className="flex flex-col items-center p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="w-16 h-1 bg-emotion-primary rounded-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported emotions section */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Desteklenen Duygular</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {supportedEmotions.map((emotion, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-soft flex flex-col items-center hover:bg-emotion-light/20 transition-colors"
            >
              <span className="text-4xl mb-2">{emotion.emoji}</span>
              <span className="font-medium">{emotion.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project description */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Proje Hakkında</h2>
        <p className="text-gray-600">
          Bu proje, yapay zeka kullanarak duygu tanıma araştırmamızın bir parçası olarak geliştirilmiştir. 
          Amacımız, yüz ifadelerinden duyguları doğru bir şekilde tespit edebilen erişilebilir ve sezgisel bir 
          araç oluşturmaktı. Ekip, bu uygulamayı oluşturmak için derin öğrenme modelleri, duyarlı web tasarımı 
          ve sezgisel kullanıcı arayüzleri konusundaki uzmanlıklarını birleştirdi.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-auto">
        <p>Derin Öğrenme & OpenCV ile güçlendirilmiştir</p>
      </footer>
    </div>
  );
};

export default AboutUs;
