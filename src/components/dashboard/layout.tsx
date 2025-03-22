
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/landing/footer';
import { 
  Calendar, 
  FileText, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  User,
  Users,
  X 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth');
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/dashboard/itinerary', label: 'Itinerary', icon: <Calendar className="h-5 w-5" /> },
    { path: '/dashboard/invoices', label: 'Invoices', icon: <FileText className="h-5 w-5" /> },
    { path: '/dashboard/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="min-h-screen flex bg-batik-dark bg-opacity-95 batik-overlay">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 lg:relative transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20'
        } w-64 lg:translate-x-0 bg-sidebar border-r border-border/20 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            {isSidebarOpen && (
              <span className="text-xl font-bold">TourGenius</span>
            )}
            {!isSidebarOpen && (
              <span className="text-xl font-bold">TG</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:flex hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <Separator />
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        <Separator />
        
        <div className="p-4">
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              {isSidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            size={isSidebarOpen ? "default" : "icon"}
            onClick={handleLogout}
            className={`${isSidebarOpen ? 'w-full' : 'w-10 h-10'}`}
          >
            <LogOut className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center bg-batik-dark/90 backdrop-blur-md h-16 px-4 border-b border-border/20 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 font-bold">TourGenius</div>
        </header>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
