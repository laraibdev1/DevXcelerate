"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, Book, ChevronDown, LogOut, Menu, Search, Settings, User } from "lucide-react"

const courseCategories = [
  {
    name: "Web Development",
    courses: [
      { name: "HTML & CSS Fundamentals", level: "Beginner" },
      { name: "JavaScript Essentials", level: "Beginner" },
      { name: "React.js Development", level: "Intermediate" },
      { name: "Node.js Backend Development", level: "Intermediate" },
      { name: "Full Stack Web Development", level: "Advanced" },
      { name: "Web Security & Performance", level: "Advanced" },
    ]
  },
  {
    name: "App Development",
    courses: [
      { name: "iOS Development with Swift", level: "Intermediate" },
      { name: "Android Development with Kotlin", level: "Intermediate" },
      { name: "React Native for Cross-Platform Apps", level: "Intermediate" },
      { name: "Flutter Development", level: "Intermediate" },
      { name: "Mobile UX/UI Design", level: "Beginner" },
      { name: "App Monetization Strategies", level: "Advanced" },
    ]
  },
  {
    name: "DevOps",
    courses: [
      { name: "Introduction to DevOps", level: "Beginner" },
      { name: "Containerization with Docker", level: "Intermediate" },
      { name: "Kubernetes Orchestration", level: "Advanced" },
      { name: "CI/CD Pipeline Implementation", level: "Intermediate" },
      { name: "Infrastructure as Code", level: "Advanced" },
      { name: "Cloud Computing (AWS/Azure/GCP)", level: "Intermediate" },
    ]
  },
  {
    name: "Machine Learning",
    courses: [
      { name: "Introduction to Machine Learning", level: "Beginner" },
      { name: "Deep Learning Fundamentals", level: "Intermediate" },
      { name: "Natural Language Processing", level: "Advanced" },
      { name: "Computer Vision with Deep Learning", level: "Advanced" },
      { name: "Reinforcement Learning", level: "Intermediate" },
      { name: "ML Ops and Deployment", level: "Advanced" },
    ]
  },
  {
    name: "Data Science",
    courses: [
      { name: "Python for Data Science", level: "Beginner" },
      { name: "Statistical Analysis in R", level: "Intermediate" },
      { name: "Big Data Processing with Spark", level: "Advanced" },
      { name: "Data Visualization Techniques", level: "Intermediate" },
      { name: "Predictive Modeling", level: "Advanced" },
      { name: "Ethics in Data Science", level: "Intermediate" },
    ]
  },
  {
    name: "Data Analytics",
    courses: [
      { name: "SQL for Data Analysis", level: "Beginner" },
      { name: "Business Intelligence Tools", level: "Intermediate" },
      { name: "Data Warehousing Concepts", level: "Intermediate" },
      { name: "Advanced Excel for Analytics", level: "Intermediate" },
      { name: "Data Storytelling", level: "Advanced" },
      { name: "A/B Testing and Experimentation", level: "Advanced" },
    ]
  },
]

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const filteredCategories = courseCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <TooltipProvider>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-md"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">DevXelerate</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    Courses <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {courseCategories.map((category) => (
                      <DropdownMenuSub key={category.name}>
                        <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-56">
                          <DropdownMenuLabel>Courses</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {category.courses.map((course) => (
                            <DropdownMenuItem key={course.name}>
                              <span>{course.name}</span>
                              <Badge variant="secondary" className="ml-2">
                                {course.level}
                              </Badge>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost">Programs</Button>
              <Button variant="ghost">Resources</Button>
              <Button variant="ghost">Community</Button>
            </nav>

            {/* Search, Notifications, Dark Mode, and User Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg">
                    {filteredCategories.map((category) => (
                      <div key={category.name} className="px-4 py-2 hover:bg-accent cursor-pointer">
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-background border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {courseCategories.map((category) => (
                <DropdownMenu key={category.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      {category.name} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {category.courses.map((course) => (
                      <DropdownMenuItem key={course.name}>
                        <span>{course.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {course.level}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
              <Button variant="ghost" className="w-full justify-start">Programs</Button>
              <Button variant="ghost" className="w-full justify-start">Resources</Button>
              <Button variant="ghost" className="w-full justify-start">Community</Button>
            </div>
            <div className="px-2 pt-2 pb-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 flex items-center justify-between">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{isDarkMode ? "Dark" : "Light"} Mode</span>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </nav>
        )}
      </header>
    </TooltipProvider>
  )
} 