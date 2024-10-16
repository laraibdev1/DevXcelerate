'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, GraduationCap, Heart, Star, Users, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number | undefined;
  progress?: number;
  imageUrl: string;
  topics: string[];
}

export default function DynamicCourseCard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses data");
        }
        const data: Course[] = await response.json();
        setCourses(data); // Set all courses
      } catch (err) {
        setError("Error fetching course data. Please try again later.");
        console.error("Error fetching course data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!courses.length) {
    return <ErrorDisplay message="No courses available." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TooltipProvider>
      <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <img
            src={course.imageUrl}
            alt={`${course.title} course thumbnail`}
            className="w-full h-48 object-cover"
          />
          <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
            {course.level}
          </Badge>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold line-clamp-2">{course.title}</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <GraduationCap className="w-4 h-4" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students ? course.students.toLocaleString() : "N/A"} students</span>
              </div>
          </div>
          {course.progress !== undefined && course.progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Topics Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {course.topics && course.topics.length > 0 ? (
                course.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))
              ) : (
                <span>No topics available.</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            {course.progress !== undefined && course.progress > 0 ? (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Continue Learning
              </>
            ) : (
              "Enroll Now"
            )}
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-2 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} className="h-6 w-16" />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <Card className="w-full max-w-md p-6 text-center">
      <CardTitle className="text-red-500 mb-4">Error</CardTitle>
      <p>{message}</p>
    </Card>
  );
}