import { Navbar, Footer } from '@/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="bg-off-white">{children}</div>
      <Footer />
    </div>
  );
}
