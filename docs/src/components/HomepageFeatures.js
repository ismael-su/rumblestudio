import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
	{
		title: 'Make your own playlist',
		img: 'img/listening-podcast.png',
		description: (
			<>
				The Rumble Player allow you to create your own playlist and to
				manage it with all the common methods (next, prev, shuffle...),
				as if you were in a real player like Deezer, Spotify...
			</>
		),
	},
	{
		title: 'Save Time',
		img: 'img/time-management.png',
		description: (
			<>
				With the widget generator you will not have to create the
				component to manage the playlist, things like loading bar, sound
				bar, pause / next / previous buttons... will be generated with
				HTML Custom Elements
			</>
		),
	},
	{
		title: 'Easy to Use',
		img: 'img/listening-podcast.png',
		description: (
			<>
				Docusaurus was designed from the ground up to be easily
				installed and used to get your website up and running quickly.
			</>
		),
	},
];

function Feature({ img, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<img src={img} alt={title} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row featureContent">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
