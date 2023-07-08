import Navbar from '@/components/Navbar';
import '@/styles/global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
