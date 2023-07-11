/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import A from '../../components/A';
import Img from '../../components/Img';
import { useEffect } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';

export function renderHomeHeader(props: any) {
	const { content } = props;
	const { image } = content;

	return (
		<header className="flex">
			<div className="header">
				{image && (
					<a className="logo" href="/">
						<img
							height="200"
							width="200"
							src={image['@link']}
							alt="Logo"
						/>
					</a>
				)}
			</div>

			<nav>
				<ul className="nav-links">
					{content['@nodes'].map((nodeName: any) => (
						<li key={content[nodeName]['@id']}>
							<EditableComponent
								content={{ ...content[nodeName] }}
							/>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export const HomeHeader = React.memo(function HomeHeader() {
	const [header, setHeader] = useState();

	useEffect(() => {
		async function getHeader() {
			const pages = await fetch(
				'https://delivery-preview.saas.magnolia-cloud.com/environments/main/delivery/pages/v1/magnetic?subid_token=kka3zes5ed4dnoug'
			);

			const json = await pages.json();
			setHeader(json.header);
		}

		getHeader();
	}, []);

	return header ? (
		<EditableArea content={header} customView={renderHomeHeader} />
	) : null;
});

export default function Home(props: any) {
	const { main, header } = props;

	return (
		<>
			<main>
				{header && (
					<EditableArea
						content={header}
						customView={renderHomeHeader}
					/>
				)}

				{main && <EditableArea content={main} />}
				<Footer />
			</main>
		</>
	);
}
