
var batt = {x:5, y:15, dx:30, dy:40};
var gnd = {x:55, y:1, dx:20, dy:0};

function scheme_draw() {
	// remove var clock_text = cl_timestr();
	var elem_c = document.getElementById('sch_text');
	var out = get_timestr();
	elem_c.innerHTML = out;

	var canvas = document.getElementById('schemes');
	if(!canvas.getContext) {return;}
	var ctx = canvas.getContext('2d');

	ctx.lineWidth = 2;
	d_gnd(ctx, 50, 1);
	d_batt(ctx);

	//main harness
	d_main(ctx, 100, 150);
}

// wire right
// xy start and end
function d_wire_r(ctx, clr, xs, ys, xe, ye) { 
}

function d_gnd(ctx, x, y) {
	make_line(ctx, gnd.x, gnd.y, gnd.dx, 0);
	make_line(ctx, gnd.x + (gnd.dx * (1/5)), gnd.y + 4, 
			  gnd.dx * (3/5), 0);
 }

function d_batt(ctx) {
	// battery
	ctx.strokeRect(batt.x, batt.y, batt.dx, batt.dy);
	// remove change to batt.
	var x = batt.x;
	var y = batt.y;
//	d_wire_r(ctx, "red", x+30, y+3, x+);

	make_line(ctx, x+30, y+3, 5, 0);
	make_line(ctx, x+35, y+3, 0, -(y+3));
	ctx.strokeStyle = "red";
	make_line(ctx, x+30, y+30, 5, 0);
	make_line(ctx, x+35, y+30, 0, 105);
	make_line(ctx, x+35, y+135, 55, 0);
 }

function d_main(ctx, x, y) {

	ctx.strokeStyle = "black";
	ctx.lineCap = "round";
	ctx.lineWidth = 10;
	// x, y, dx, dy
	make_line(ctx, x, y, 0, 200);
}
