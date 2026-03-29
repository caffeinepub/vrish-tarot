import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import About from "./components/About";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Instagram from "./components/Instagram";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen" style={{ background: "#3b0d8a" }}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <BookingSection />
          <Testimonials />
          <Instagram />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
