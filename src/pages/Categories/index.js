import Template from '../Template';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState();

	useEffect(() => {
		setError(null);

		const categoryCached = sessionStorage.getItem('categories');

		if (!categoryCached) {
			fetch('https://api.publicapis.org/categories')
				.then((response) => response.json())
				.then(
					(data) => {
						onSetResult(data, false);
					},
					(error) => {
						setError(error);
					},
				);
		} else {
			setCategories(JSON.parse(categoryCached));
		}
	}, []);

	const onSetResult = (result, isAPIs) => {
		sessionStorage.setItem('categories', JSON.stringify(result));
		setCategories(result);
	};

	if (error) {
		return (
			<Template>
				<div className='flex justify-center text-2xl sm:text-3xl m-4 mt-6'>
					<div className='border-b-2 border-gray-400 border-solid'>
						API Categories
					</div>
				</div>
				<div
					className='flex justify-center text-xl m-4 p-4 
                    animate-pulse'
				>
					The API categories weren't able to be loaded. Reload or try
					again in a few minutes.
				</div>
				<div className='flex-grow' />
			</Template>
		);
	} else {
		return (
			<Template>
				<div
					className='flex justify-center text-2xl sm:text-3xl m-4 
                    mt-6'
				>
					<div className='border-b-2 border-gray-400 border-solid'>
						API Categories
					</div>
				</div>
				<div
					className='m-4 sm:m-6 mt-0 sm:mt-0 flex flex-wrap 
                    justify-center'
				>
					{categories.map((category) => (
						<Link
							className='text-lg rounded-lg p-3 m-3 bg-gray-200 
                            w-64 text-center shadow-lg hover:shadow-xl
                            cursor-pointer hover:bg-gray-100'
							key={category}
							to={`/categories/${category}`}
						>
							{category}
						</Link>
					))}
					<Link
						className='text-lg rounded-lg p-3 m-3 bg-gray-300 
                        w-64 text-center shadow-lg hover:shadow-xl 
                        cursor-pointer hover:bg-gray-200'
						to={`/browse`}
					>
						View all APIs
					</Link>
				</div>
				<div className='flex-grow' />
			</Template>
		);
	}
}

export default Categories;