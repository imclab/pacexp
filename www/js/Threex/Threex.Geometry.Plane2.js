// NOTE: this match THREE namespace on purpose
if(typeof THREEx === "undefined")		var THREEx	= {};
if(typeof THREEx.Geometry === "undefined")	THREEx.Geometry	= {};

/**
 * @author mr.doob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane2.as
 */

THREEx.Geometry.Plane2 = function ( width, height, segmentsWidth, segmentsHeight ) {

	THREE.Geometry.call( this );

	var ix, iy,
	width_half = width / 2,
	height_half = height / 2,
	gridX = segmentsWidth || 1,
	gridY = segmentsHeight || 1,
	gridX1 = gridX + 1,
	gridY1 = gridY + 1,
	segment_width = width / gridX,
	segment_height = height / gridY;


	for( iy = 0; iy < gridY1; iy++ ) {

		for( ix = 0; ix < gridX1; ix++ ) {

			var x = ix * segment_width - width_half;
			var y = iy * segment_height - height_half;

			this.vertices.push( new THREE.Vertex( new THREE.Vector3( x, - y, 0 ) ) );

		}

	}

	for( iy = 0; iy < gridY; iy++ ) {

		for( ix = 0; ix < gridX; ix++ ) {

			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			this.faces.push( new THREE.Face4( a, b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [
						new THREE.UV( 0, 0 ),
						new THREE.UV( 0, 1 ),
						new THREE.UV( 1, 1 ),
						new THREE.UV( 1, 0 ),
						//new THREE.UV( ix / gridX, iy / gridY ),
						//new THREE.UV( ix / gridX, ( iy + 1 ) / gridY ),
						//new THREE.UV( ( ix + 1 ) / gridX, ( iy + 1 ) / gridY ),
						//new THREE.UV( ( ix + 1 ) / gridX, iy / gridY )
					] );

		}

	}

	this.computeCentroids();
	this.computeFaceNormals();

};

THREEx.Geometry.Plane2.prototype = new THREE.Geometry();
THREEx.Geometry.Plane2.prototype.constructor = THREEx.Geometry.Plane2;
