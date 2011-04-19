/** @namespace */
var WebyMaze	= WebyMaze || {};

/** @namespace */
WebyMaze.ConfigCli	= {
	sample		: {},
	pacmaze 	: {dev: {}, prod: {}},
	tweetymaze	: {dev: {}, prod: {}}
};


WebyMaze.ConfigCli.PROJECT	= 'pacmaze';
//WebyMaze.ConfigCli.PROJECT	= 'tweetymaze';
WebyMaze.ConfigCli.ENV		= 'dev';

//////////////////////////////////////////////////////////////////////////////////
//		webglRender							//
//////////////////////////////////////////////////////////////////////////////////

WebyMaze.ConfigCli.sample.webglRender	= {
	/** playerRotation Determine the type of player control */
	playerRotation	: 'free',
	//playerRotation: 'grid'
	/** minimapEnabled  to enable the minimap */
	minimapEnabled	: true
};

WebyMaze.ConfigCli.pacmaze.prod.webglRender	= {
	playerRotation	: 'grid',
	minimapEnabled	: false
};

WebyMaze.ConfigCli.pacmaze.dev.webglRender	= {
	playerRotation	: 'grid',
	minimapEnabled	: true
};

WebyMaze.ConfigCli.tweetymaze.dev.webglRender	= {
	playerRotation	: 'free',
	minimapEnabled	: true
};

WebyMaze.ConfigCli.webglRender	= WebyMaze.ConfigCli[WebyMaze.ConfigCli.PROJECT][WebyMaze.ConfigCli.ENV].webglRender;
//WebyMaze.ConfigCli.webglRender	= WebyMaze.ConfigCli['pacmaze']['dev'].ui;

console.log("super configcli", WebyMaze.ConfigCli.webglRender);

//////////////////////////////////////////////////////////////////////////////////
//		ui								//
//////////////////////////////////////////////////////////////////////////////////

WebyMaze.ConfigCli.sample.ui	= {
	/** showStat show webgl performance vuemeter or not */
	showStat	: true
};

WebyMaze.ConfigCli.pacmaze.prod.ui	= {
	showStat	: false
};

WebyMaze.ConfigCli.pacmaze.dev.ui	= {
	showStat	: true
};

WebyMaze.ConfigCli.tweetymaze.dev.ui	= {
	showStat	: true
};

WebyMaze.ConfigCli.ui	= WebyMaze.ConfigCli[WebyMaze.ConfigCli.PROJECT][WebyMaze.ConfigCli.ENV].ui;
//WebyMaze.ConfigCli.ui	= WebyMaze.ConfigCli['pacmaze']['dev'].ui;

//////////////////////////////////////////////////////////////////////////////////
//		scene								//
//////////////////////////////////////////////////////////////////////////////////

WebyMaze.ConfigCli.sample.scene	= {
	/** cameraFov the fov of the camera */
	cameraFov	: 60,
	/** cameraNear the near of the camera */
	cameraNear	: 1,
	/** cameraFar the far of the camera */
	cameraFar	: 2800
};

WebyMaze.ConfigCli.pacmaze.prod.scene	= {
	cameraFov	: 60,
	cameraNear	: 1,
	cameraFar	: 2800
};

WebyMaze.ConfigCli.pacmaze.dev.scene	= {
	cameraFov	: 60,
	cameraNear	: 1,
	cameraFar	: 2800
};

WebyMaze.ConfigCli.tweetymaze.dev.scene	= {
	cameraFov	: 60,
	cameraNear	: 1,
	cameraFar	: 2800
};

WebyMaze.ConfigCli.scene	= WebyMaze.ConfigCli[WebyMaze.ConfigCli.PROJECT][WebyMaze.ConfigCli.ENV].scene;
//WebyMaze.ConfigCli.scene	= WebyMaze.ConfigCli['pacmaze']['dev'].scene;

