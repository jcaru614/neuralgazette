import React from 'react';
import Logo from '@/components/Logo';

const Navbar = () => {
	return (
		<header className='bg-gray-800 text-white py-4 px-8'>
			<nav>
				<ul className='flex justify-between'>
					<li>
						<a href='#' className='text-white font-bold text-xl'>
							<Logo />
						</a>
					</li>
					<li>
						<ul className='flex space-x-4'>
							<li>
								<a href='#' className='hover:text-gray-300'>
									Home
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-gray-300'>
									About
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-gray-300'>
									Contact
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
