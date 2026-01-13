import SausageNav from '@/components/SausageNav';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 py-6 bg-background relative overflow-x-hidden overflow-y-auto">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern"></div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <SausageNav />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center pt-20 sm:pt-24 md:pt-16 pb-8 px-4 sm:px-6 md:px-8">

        {/* Left Column: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 mb-5 sm:mb-8 text-[10px] sm:text-xs font-semibold tracking-wide text-foreground uppercase bg-card border border-border rounded-full shadow-sm animate-fade-in">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
            Tracking 2.0
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.1] animate-slide-up">
            Master Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-muted-foreground">
              Dance Journey.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-md sm:max-w-lg lg:max-w-xl leading-relaxed animate-slide-up [animation-delay:100ms]">
            Capture every breakthrough. A simple, elegant way to log your daily dance progress and keep your momentum alive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto animate-slide-up [animation-delay:200ms]">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm sm:text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start Tracking
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-card text-foreground border border-border rounded-full font-semibold text-sm sm:text-base hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center order-1 lg:order-2 animate-slide-down [animation-delay:150ms] w-full">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] shrink-0 mx-auto">
            {/* Organic blobs background/glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl animate-pulse"></div>

            {/* Image Container with Double Ring Border */}
            <div className="relative w-full h-full rounded-full p-1.5 sm:p-2 border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl ring-1 ring-border/50">
              <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-background shadow-inner relative">
                <img
                  src="/admin.jpeg"
                  alt="Dance Instructor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* Floating generic decorative elements - hidden on mobile, visible on larger screens */}
            <div className="hidden md:flex absolute -top-2 lg:-top-4 right-0 lg:-right-8 px-3 py-1.5 bg-card rounded-xl shadow-lg border border-border items-center justify-center animate-bounce [animation-duration:3s]">
              <span className="text-xs font-bold truncate">RabindraNritya</span>
            </div>
            <div className="hidden md:flex absolute -bottom-1 lg:-bottom-2 left-2 lg:-left-4 px-3 py-1.5 bg-card rounded-full shadow-lg border border-border items-center justify-center animate-bounce [animation-duration:4s] [animation-delay:1s]">
              <span className="text-xs font-bold">Kathak</span>
            </div>
            <div className="hidden lg:flex absolute bottom-8 -right-16 xl:-right-20 px-3 py-1.5 bg-card rounded-xl shadow-lg border border-border items-center justify-center animate-bounce [animation-duration:5s] [animation-delay:0.5s]">
              <span className="text-xs font-bold">Creative Dance</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden animate-bounce opacity-40">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full"></div>
        </div>
      </div>
    </main>
  );
}
