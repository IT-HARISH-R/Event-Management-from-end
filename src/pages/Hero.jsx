import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gray-50 w-[100vw] relative translate-x-[-10%]">
      {/* Hero Section */}
      <header className="relative w-full min-h-screen flex items-center justify-center text-white text-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center w-full"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/realistic-dynamic-fog-background_23-2149111508.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>


        {/* Content Container */}
        <div className="relative z-10 w-full px-6">
          <h1 className="text-5xl font-bold animate-fadeIn">Welcome to EventHub</h1>
          <p className="mt-4 text-lg opacity-90">Discover and manage amazing events effortlessly.</p>
          <Link to="/home">
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-transform transform hover:scale-105">
              Explore Events
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-16 px-6 container mx-auto">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12 w-full">
          {[
            { title: "Easy Booking", text: "Book tickets for events in just a few clicks." },
            { title: "Secure Payments", text: "Safe and fast transactions with Razorpay." },
            { title: "Stay Updated", text: "Get real-time updates on upcoming events." }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="w-full text-center py-16">
        <h2 className="text-2xl font-bold">Start Exploring Events Now!</h2>
        <Link to="/home">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
