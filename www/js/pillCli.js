var WebyMaze	= WebyMaze || {};

//////////////////////////////////////////////////////////////////////////////////
//		ctor/dtor							//
//////////////////////////////////////////////////////////////////////////////////

WebyMaze.PillCli	= function(){
}

WebyMaze.PillCli.prototype.destroy	= function(){
}

//////////////////////////////////////////////////////////////////////////////////
//		misc								//
//////////////////////////////////////////////////////////////////////////////////

WebyMaze.PillCli.prototype.setCtxTick	= function(ctxTick){
	this.pillType			= ctxTick.pillType;
	if( !this._container )	this._containerCtor();
	//if( !this._container )	this._containerSpriteCtor();

	this._container.position.x	= ctxTick.position.x;
	this._container.position.z	= ctxTick.position.y;
	this._container.rotation.y	= ctxTick.rotation.z;
}

WebyMaze.PillCli.prototype.obj3d	= function(){
	return this._container;
}

WebyMaze.PillCli.prototype._containerSpriteCtor	= function()
{
	var mesh	= new THREE.Sprite({
		//map			: THREE.ImageUtils.loadTexture('images/tmp/sprite0.png'),
		map			: THREE.ImageUtils.loadTexture('images/lensFlare/Flare2.png'),
		useScreenCoordinates	: false
	});

	if( this.pillType == 'white' ){
		mesh.scale.set( 0.4, 0.4, 1.0 );
	}else if( this.pillType == 'red' ){
		mesh.scale.set( 0.6, 0.6, 1.0 );
	}else {
		console.assert(false);
	}

	this._container	= new THREE.Object3D();
	this._container.addChild(mesh)
}

WebyMaze.PillCli.prototype._containerCtor	= function(){
	// build this._container
	var bodyW	= 25;
	var detailMult	= 1;
	if( this.pillType == 'white' ){
		detailMult	= 1;
		bodyW		= 25;
	}else{
		detailMult	= 4;
		bodyW		= 50;
	}
	
	var geometry = [
		[ new THREE.Sphere( bodyW/2, 8*detailMult, 4*detailMult )	, 500 ],
		[ new THREE.Sphere( bodyW/2, 4*detailMult, 2*detailMult )	, 700 ],
		[ new THREE.Sphere( bodyW/2, 3*detailMult, 2*detailMult )	, 1500 ],
	];

	// determine the material based on this.pillType	
	var material	= null;
	if( this.pillType == 'white' ){
		material	= [
			new THREE.MeshLambertMaterial( { color: 0xFFFFFF, shading: THREE.SmoothShading} ),
		];
	}else if( this.pillType == 'red' ){
		material	= [
			new THREE.MeshPhongMaterial( { ambient: 0xFF0000, color: 0x00FF00, specular: 0x555555, shininess: 10 } ),
			
			//new THREE.MeshLambertMaterial( { color: 0xFFFFFF, shading: THREE.SmoothShading} ),
		];
	}else console.assert(false, 'unknown pillType '+this.pillType);

	// build the object	
	this._container	= new THREE.LOD();
	for(var i = 0; i < geometry.length; i++ ) {
		var mesh = new THREE.Mesh( geometry[i][0], material );
		this._container.add( mesh, geometry[i][1] );
	}
}

