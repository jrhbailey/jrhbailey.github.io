// Javascript utilities

// debug
//	console.log('inset: ' + ins.toString() + ' width: ' + insw.toString());


function get_timestr() { 
	var d = new Date();
	return  d.toLocaleString() + "<br />\n";
}

// line, abs coordinates
function make_line_abs(ctx, sx, sy, ex, ey) {
	ctx.beginPath();
	ctx.moveTo(sx, sy);
	ctx.lineTo(ex, ey);
	ctx.stroke();
 }

// delta version
// pass in x, y
// note: dy: + is down, - is up
function make_line(ctx, x, y, dx, dy) {
	make_line_abs(ctx, x, y, x + dx, y + dy);
}
