import ModernHeader from '@/components/Header';
import DynamicCourseCard from '@/components/DynamicCard';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernHeader />
      <main className="flex-grow">
        <section className=" from-primary to-primary-foreground py-60  ">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-6">
              Advance Your Engineering Career with DevXcelerate
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Master cutting-edge technologies and skills with our expert-led courses
            </p>
            <Button size="lg" variant="secondary">
              Explore Courses
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
            <DynamicCourseCard />
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Courses
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Choose DevXcelerate?</h2>
              <p className="text-lg mb-8">
                DevXcelerate offers cutting-edge courses designed specifically for engineers, 
                taught by industry experts and leading academics. Our platform provides:
              </p>
              <ul className="text-left list-disc list-inside mb-8">
                <li>Hands-on projects and real-world applications</li>
                <li>Flexible learning schedules to fit your busy life</li>
                <li>Certificates recognized by top engineering firms</li>
                <li>A supportive community of fellow engineers</li>
              </ul>
              <Button size="lg">Start Learning Today</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevXcelerate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}