import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import useThemeContext from '@theme/hooks/useThemeContext';

function HomepageHeader() {
	const { isDarkTheme } = useThemeContext();

	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container headerContent">
				<img
					src={
						isDarkTheme
							? 'img/waveform-dark.png'
							: 'img/waveform.png'
					}
					alt="waveform"
					className="waveform"
				/>
				<div>
					<h1 className="hero__title">
						Javascript libraries to manage audio content
					</h1>
					<div className={styles.buttons}>
						<Link
							className="button button--secondary button--lg"
							to="/docs/intro"
						>
							Start Playing
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export default function Home() {
	return (
		<Layout
			title="Home"
			description="Description will go into a meta tag in <head />"
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
