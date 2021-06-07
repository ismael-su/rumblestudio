const config1 = {
	dimensions: {
		height: '520px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 3,
	},
	elements: [
		{
			task: 'play',
			cssClasses: '',
			width: '275px',
			height: '50px',
			x: '10px',
			y: '5px',
		},
		{
			task: 'stop',
			cssClasses: '',
			width: '50px',
			height: '50px',
			x: '10px',
			y: '60px',
		},
		{
			task: 'bar',
			cssClasses: '',
			width: '140px',
			height: '50px',
			x: '80px',
			y: '80px',
		},
		{
			task: 'playlist',
			cssClasses: '',
			width: '540px',
			height: '300px',
			x: '10px',
			y: '120px',
		},
		{
			task: 'pause',
			cssClasses: '',
			width: '50px',
			height: '50px',
			x: '540px',
			y: '60px',
		},
	],
};

const config2 = {
	dimensions: {
		height: '30px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 4,
	},
	elements: [
		{
			task: 'play',
			cssClasses: '',
		},
		{
			task: 'pause',
			cssClasses: '',
		},
		{
			task: 'prev',
			cssClasses: '',
		},
		{
			task: 'next',
			cssClasses: '',
		},
	],
};

const config3 = {
	dimensions: {
		height: '30px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 4,
	},
	elements: [
		{
			task: 'play',
			cssClasses: '',
		},
		{
			task: 'pause',
			cssClasses: '',
		},
		{
			task: 'bar',
			cssClasses: '',
		},
		{
			task: 'stop',
			cssClasses: '',
		},
	],
};

const config4 = {
	dimensions: {
		height: '30px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 6,
	},
	elements: [
		{
			task: 'play',
			cssClasses: '',
		},
		{
			task: 'pause',
			cssClasses: '',
		},
		{
			task: 'bar',
			cssClasses: '',
		},
		{
			task: 'stop',
			cssClasses: '',
		},
		{
			task: 'prev',
			cssClasses: '',
		},
		{
			task: 'next',
			cssClasses: '',
		},
	],
};

const config5 = {
	dimensions: {
		height: '30px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 10,
	},
	elements: [
		{
			task: 'play',
			cssClasses: '',
		},
		{
			task: 'pause',
			cssClasses: '',
		},
		{
			task: 'stop',
			cssClasses: '',
		},
		{
			task: 'bar',
			cssClasses: '',
		},
		{
			task: 'prev',
			cssClasses: '',
		},
		{
			task: 'next',
			cssClasses: '',
		},
		{
			task: 'forward',
			cssClasses: '',
		},
		{
			task: 'rewind',
			cssClasses: '',
		},
		{
			task: 'loop',
			cssClasses: '',
		},
		{
			task: 'shuffle',
			cssClasses: 'rounded',
		},
	],
};

const CONFIGS = {
	config1,
	config2,
	config3,
	config4,
	config5,
};
export default CONFIGS;
