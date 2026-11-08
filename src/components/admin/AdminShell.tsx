'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Layers, 
  Briefcase, 
  Image as ImageIcon, 
  Inbox, 
  Mail, 
  Star, 
  Building2, 
  Users, 
  HelpCircle, 
  BookOpen, 
  FileEdit, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { AdminTokenPayload } from '@/lib/auth';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export default function AdminShell({
  user,
  children,
}: {
  user: AdminTokenPayload;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // If on login or forgot-password, do not render sidebar shell
  if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      // ignore
    }
  };

  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { title: 'Services', href: '/admin/services', icon: Layers },
    { title: 'Portfolio / Works', href: '/admin/portfolio', icon: Briefcase },
    { title: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { title: 'Inquiries & Leads', href: '/admin/inquiries', icon: Inbox },
    { title: 'Newsletter Subscribers', href: '/admin/subscribers', icon: Mail },
    { title: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { title: 'Clients / Logos', href: '/admin/clients', icon: Building2 },
    { title: 'Team Members', href: '/admin/team', icon: Users },
    { title: 'FAQs Manager', href: '/admin/faqs', icon: HelpCircle },
    { title: 'Blog Articles', href: '/admin/blog', icon: BookOpen },
    { title: 'Pages & Content', href: '/admin/pages', icon: FileEdit },
    { title: 'Site Settings', href: '/admin/settings', icon: Settings },
    { title: 'Users & Roles', href: '/admin/users', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F2] dark:bg-slate-950 flex">
      
      {/* Sidebar Desktop */}
      <aside
        className={`hidden lg:flex flex-col justify-between border-r border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-30 sticky top-0 h-screen ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Logo Bar */}
          <div className="p-4 border-b border-brand-border dark:border-slate-800 flex items-center justify-between">
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-2">
                <div className="relative h-9 w-36">
                  <Image src="/logo.png" alt="B Growth Agency" fill className="object-contain object-left" priority />
                </div>
              </Link>
            )}
            {collapsed && (
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm mx-auto">
                B
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-brand-muted hover:text-brand-navy p-1.5 rounded-lg hover:bg-brand-bg dark:hover:bg-slate-800"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-brand-muted dark:text-gray-400 hover:text-brand-navy dark:hover:text-white hover:bg-brand-bg dark:hover:bg-slate-800'
                  }`}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom user card & logout */}
          <div className="p-3 border-t border-brand-border dark:border-slate-800 space-y-2">
            {!collapsed && (
              <div className="p-2.5 rounded-xl bg-brand-bg dark:bg-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {user.name[0] || 'A'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-brand-navy dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-brand-muted dark:text-gray-400 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-status-danger hover:bg-status-danger/10 rounded-xl transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-brand-border dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-brand-navy dark:text-white hover:bg-brand-bg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-brand-muted dark:text-gray-400">
              <span className="font-semibold text-brand-navy dark:text-gray-200">Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary font-bold capitalize">
                {pathname.split('/')[2] || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-brand-border dark:border-slate-700 bg-brand-bg dark:bg-slate-800 text-brand-navy dark:text-white hover:border-primary transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white dark:bg-slate-900 h-full flex flex-col justify-between p-4 z-10 border-r border-brand-border dark:border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border dark:border-slate-800">
                <div className="relative h-8 w-32">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain object-left" />
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-navy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 overflow-y-auto max-h-[70vh]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-brand-muted hover:text-brand-navy hover:bg-brand-bg'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-brand-border dark:border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-status-danger bg-status-danger/10 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
