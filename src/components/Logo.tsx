import Image from 'next/image';
import profile from '@/public/images/profile.png';

const Logo = () => (
	<Image
		src={profile} // Route of the image file
		height={144} // Desired size with correct aspect ratio
		width={144} // Desired size with correct aspect ratio
		alt='Your Name'
	/>
);

export default Logo;
