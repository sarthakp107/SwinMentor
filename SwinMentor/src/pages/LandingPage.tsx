<<<<<<< HEAD
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const {user} = useAuth();

  const displayName = user?.user_metadata.user_name||user?.user_metadata.name || user?.email || "Student";
  console.log(user?.user_metadata);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
             {user ? (<h1 className="text-5xl font-bold text-gray-800 mb-6">
                Hello <span className="text-red-600">{displayName}!</span>
              </h1>) :<span className="text-red-600">Study</span> }
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Transform Your Notes into <span className="text-red-600">Smart Flashcards</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload your study materials and instantly create interactive flashcards. Learn smarter, not harder with Cheetos.
              </p>
              <div className="flex gap-4">
                <Link to="/create" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  Create Flashcards
                </Link>
                <Link to="/demo" className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors">
                  Try Demo
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-red-600 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ace Your Studies?</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Transform your study materials into effective flashcards in seconds. Start learning smarter today!
          </p>
          <Link to="/upload" className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors inline-block">
            Start Creating
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "📄",
    title: "Upload Files",
    description: "Simply upload your study materials in PDF, DOCX, or TXT format."
  },
  {
    icon: "⚡",
    title: "Instant Generation",
    description: "Our AI automatically creates flashcards from your uploaded content."
  },
  {
    icon: "📱",
    title: "Study Anywhere",
    description: "Access your flashcards on any device and study at your own pace."
  }
];

export default LandingPage; 
=======
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  BookOpenIcon 
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const features = [
  {
    name: 'Find Expert Mentors',
    description: 'Connect with experienced students and alumni who excel in your field of study. Get personalized guidance from those who\'ve successfully navigated your current challenges.',
    icon: AcademicCapIcon,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions that fit your timetable. Choose between in-person or online meetings, and select times that work best for your schedule.',
    icon: CalendarIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Track Progress',
    description: 'Monitor your improvement with detailed feedback after each session. Set goals and watch as you achieve them with your mentor\'s guidance.',
    icon: ChartBarIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: 'Resource Library',
    description: 'Access a curated collection of study materials, past exam papers, and helpful resources shared by mentors and top-performing students.',
    icon: BookOpenIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        className="relative bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Find your perfect</span>
                  <span className="block text-red-600">mentor at Swinburne</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Connect with experienced mentors who can guide you through your academic journey and help you achieve your goals.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get the support and guidance you need to excel in your studies at Swinburne.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              {features.map((feature) => (
                <motion.div 
                  key={feature.name} 
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-4 p-6 rounded-lg transition-all duration-300 hover:bg-gray-50">
                    <div className={`${feature.bgColor} rounded-lg p-3 inline-flex`}>
                      <feature.icon 
                        className={`h-6 w-6 ${feature.iconColor}`} 
                        aria-hidden="true" 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-red-100 transition-colors" 
                       aria-hidden="true" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 
>>>>>>> 19529f4d662b2116889f9a98495d94487239a467
