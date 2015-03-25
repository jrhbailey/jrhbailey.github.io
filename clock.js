// Javascript:

// 1 hr  = 10 units
var hr_unit = 10;
// 8a to 12p
var beg_tm = 8 * hr_unit;
var end_tm = 24 * hr_unit;
var tot_tm = end_tm - beg_tm;

// lifetime
var start_yr = 1981;
var life_yr = 70;


function get_part_day() {
	var d = new Date();
	var h = d.getHours() * hr_unit;

	if((h < beg_tm) || (h >= end_tm)) {return 0;}

	var md = Math.trunc((d.getMinutes() / 60) * hr_unit);
	h += md;
	return h - beg_tm;
 }

function draw_horiz_bars(ctx, cur_units, tot_units, 
						 clr_cur, clr_rem, 
						 l, t, scale, height) { 

	ctx.fillStyle = clr_cur; // left part
	ctx.fillRect(l, t, cur_units * scale, height);

	ctx.fillStyle = clr_rem; // right part
	ctx.fillRect(l + (cur_units * scale), t, 
				 (tot_units - cur_units) * scale, height);
}

function draw_vert_lines(ctx, unit_mks, tot_units, l, t, scale, height) {
	var tp = t - (height*0.10);
	var lp = height * 1.17;
	// no minor marks if unit_mks == 0
	if(unit_mks > 0) {
		for(var x = l; 
			x <= ((tot_units + unit_mks) * scale); 
			x += (unit_mks * scale)) {
			// x, y, dx, dy
			make_line(ctx, x, tp, 0, lp);
		} //for
	} //if

	// do qtr/half marks
	tp = t - (height*0.30);
	lp = height * 1.45;

	make_line(ctx, l, tp, 0, lp);

	var qtr = (tot_units * scale) / 4;
	make_line(ctx, l + qtr, tp, 0, lp);

	var half = qtr + qtr;
	make_line(ctx, l + half, t - (height*.50), 0, height*1.75);
	make_line(ctx, l + half + qtr, tp, 0, lp);

	make_line(ctx, l + (tot_units * scale), tp, 0, lp);
}

// ->2015
function yr() {
	return new Date().getFullYear();
 }


// day in year
function doy() { 
	var start = new Date(yr(), 0, 0);
	// today -start of year
	var diff = (new Date()) - start;
	var one_day=1000*60*60*24;
	return Math.ceil(diff/one_day);
}


// days in this year
function dity() { 
	return yr() % 4 == 0 ? 366 : 365;
}

var eqx_spring = 79;
var eqx_fall = 265;

var ss_tot = eqx_fall - eqx_spring;
var fw_tot = 100 + eqx_spring;

function is_spring() {
	d_y = doy();
	if((d_y >= eqx_spring) && (d_y < eqx_fall)) {return true;}
	else {return false;}
 }

// days after spring equinox
function do_spring() {
	return doy() - eqx_spring;
 }

function do_fall() {
	d_y = doy();
	if(d_y >= eqx_fall) { return d_y - eqx_fall;}
	else { return 100 + d_y;}
 }


// graph scaling and start
var scale = 3;
var graph_l = 10;
var graph_t = 240;
var graph_h = 75;
function clk_time() {
	// remove var clock_text = cl_timestr();
	var elem_c = document.getElementById('clk_text');

	var out = get_timestr();
	var pd_tm = get_part_day();
	//lifetime
	var elap_days = ((yr() - 1 - start_yr) * 365) + doy();

	out += (pd_tm/10).toString() + " of " + (tot_tm/10).toString() + " hrs<br />\n";
	out += "Day " + doy().toString() + " of " + dity().toString() + "<br />\n";
	out += "Year " + Math.round((elap_days / 365)*10)/10 + " of " + life_yr + " yrs<br />\n";
	
	if(is_spring()) {
		out += "Day " + do_spring() + " of " + ss_tot.toString() + " Spring/Summer" +  "<br />\n";
	}
	else {
		out += "Day " + do_fall() + " of " + fw_tot.toString() + " Fall/Winter" +  "<br />\n";
	}

	elem_c.innerHTML = out;

	var canvas = document.getElementById('clock');
	if(!canvas.getContext) {return;}
	var ctx = canvas.getContext('2d');

	// -- day graph ---
	// ctx, cur, tot, clr_cur, clr_rem, left, top, scale, height
	draw_horiz_bars(ctx, pd_tm, tot_tm, "mediumblue", "darkgreen",
					graph_l, graph_t, scale, graph_h);

	// ctx, unit_mks, tot_units, l, t, scale, height
	draw_vert_lines(ctx, hr_unit, tot_tm, graph_l, graph_t, scale, graph_h);

	// -- seasons graph --
	if(is_spring()) {
		draw_horiz_bars(ctx, do_spring(), ss_tot, "grey", "green",
						graph_l, 90, 2.58, 40);

		draw_vert_lines(ctx, 0, ss_tot, graph_l, 90, 2.58, 40);

		draw_horiz_bars(ctx, 0, fw_tot, "grey", "green", 
						graph_l, 150, 2.68, 40);

		draw_vert_lines(ctx, 0, fw_tot, graph_l, 150, 2.68, 40);
	}
	else {
		draw_horiz_bars(ctx, 0, ss_tot, "grey", "green",
						graph_l, 90, 2.58, 40);

		draw_vert_lines(ctx, 0, ss_tot, graph_l, 90, 2.58, 40);

		draw_horiz_bars(ctx, fw_tot - do_fall(), fw_tot, "grey", "green", 
						graph_l, 148, 2.68, 40);

		draw_vert_lines(ctx, 0, fw_tot, graph_l, 148, 2.68, 40);
	}

	// remove draw_horiz_bars(ctx, doy(), dity(), "green", "grey",
	// 				graph_l, 105, 1.315, 50);

	// draw_vert_lines(ctx, 28, dity(), graph_l, 105, 1.315, 50);

	// -- life graph --
	draw_horiz_bars(ctx, elap_days, life_yr * 365, "green", "grey",
					graph_l, 20, 1/53.3, 30);

	draw_vert_lines(ctx, 5*365, life_yr * 365, graph_l, 20, 1/53.3, 30);
 }
