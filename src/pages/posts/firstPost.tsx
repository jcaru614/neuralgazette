import Logo from '@/components/Logo';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function FirstPost() {
	return (
		<>
			<Layout>
				<h1>First Post</h1>
				<h2>
					<Link href='/'>← Back to home</Link>
				</h2>
			</Layout>
		</>
	);
}
