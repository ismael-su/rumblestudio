const config1 = {
	dimensions: {
		height: '30px',
		width: '600px',
	},
	layout: {
		rows: 1,
		columns: 3,
	},
	elements: [
		{
			task: 'play',
			span: 1,
		},
		{
			task: 'bar',
			span: 1,
		},
		{
			task: 'pause',
			span: 1,
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
			span: 1,
		},
		{
			task: 'pause',
			span: 1,
		},
		{
			task: 'prev',
			span: 1,
		},
		{
			task: 'next',
			span: 1,
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
			span: 1,
		},
		{
			task: 'pause',
			span: 1,
		},
		{
			task: 'bar',
			span: 1,
		},
		{
			task: 'stop',
			span: 1,
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
			span: 1,
		},
		{
			task: 'pause',
			span: 1,
		},
		{
			task: 'bar',
			span: 1,
		},
		{
			task: 'stop',
			span: 1,
		},
		{
			task: 'prev',
			span: 1,
		},
		{
			task: 'next',
			span: 1,
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
			span: 1,
		},
		{
			task: 'pause',
			span: 1,
		},
		{
			task: 'stop',
			span: 1,
		},
		{
			task: 'bar',
			span: 1,
		},
		{
			task: 'prev',
			span: 1,
		},
		{
			task: 'next',
			span: 1,
		},
		{
			task: 'forward',
			span: 1,
		},
		{
			task: 'rewind',
			span: 1,
		},
		{
			task: 'loop',
			span: 1,
		},
		{
			task: 'shuffle',
			span: 1,
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
