import SausageNav from '@/components/SausageNav';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-6 bg-background relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern"></div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <SausageNav />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-24 md:pt-12 px-4 md:px-8">

        {/* Left Column: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-8 text-xs font-semibold tracking-wide text-foreground uppercase bg-card border border-border rounded-full shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Tracking 2.0
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1] animate-slide-up">
            Master Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-muted-foreground">
              Dance Journey.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed animate-slide-up [animation-delay:100ms]">
            Capture every breakthrough. A simple, elegant way to log your daily dance progress and keep your momentum alive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto animate-slide-up [animation-delay:200ms]">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start Tracking
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-card text-foreground border border-border rounded-full font-semibold text-base hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center order-1 lg:order-2 animate-slide-down [animation-delay:150ms]">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] shrink-0">
            {/* Organic blobs background/glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl animate-pulse"></div>

            {/* Image Container with Double Ring Border */}
            <div className="relative w-full h-full rounded-full p-2 border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl ring-1 ring-border/50">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-inner relative">
                <img
                  src="/admin.jpeg"
                  alt="Dance Instructor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* Floating generic decorative elements */}
            <div className="absolute -top-4 -right-12 px-4 py-2 bg-card rounded-xl shadow-lg border border-border flex items-center justify-center animate-bounce [animation-duration:3s]">
              <span className="text-sm font-bold truncate">RabindraNritya</span>
            </div>
            <div className="absolute -bottom-2 -left-8 px-4 py-2 bg-card rounded-full shadow-lg border border-border flex items-center justify-center animate-bounce [animation-duration:4s] [animation-delay:1s]">
              <span className="text-sm font-bold">Kathak</span>
            </div>
            <div className="absolute bottom-12 -right-24 px-4 py-2 bg-card rounded-xl shadow-lg border border-border flex items-center justify-center animate-bounce [animation-duration:5s] [animation-delay:0.5s]">
              <span className="text-sm font-bold">Creative Dance</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
