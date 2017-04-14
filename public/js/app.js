
const margin = {
	top: 20,
	right: 100,
	bottom: 70,
	left:40
} 

const padding = 100


const parseDate = d3.timeFormat('%Y-%m-%d').parse;
const formatDate = d3.timeFormat('%Y-%m-%d');




const width = 1000 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom
const animateDuration = 700;
const animateDelay = 30;

const parseYear = d3.timeParse("%Y")

const y = d3.scaleLinear().range([height, 0]);
const x = d3.scaleBand().rangeRound([0, width], .1,.3);


const tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('background', '#f4f4f4')
		.style('padding', '5 15px')
		.style('border', '1px #333 solid')
		.style('border-radius', '5px')
		.style('opacity', '0')



const yAxis = d3.axisLeft(y)
	.ticks(10);

const svg = d3.select('body').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
.append('g')
	.attr('transform',
		  'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('./../data/GDP.csv', function(data) {

	data.forEach(function(d) {
		d.date = d.date;
		d.gdp = +d.gdp;
	});

	x.domain(data.map(function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) {return d.gdp; })]);

	const minDate = new Date(data[0].date);
  	const maxDate = new Date(data[data.length - 1].date);


	const xAxisScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, width]);

     var xAxis = d3.axisBottom(xAxisScale)
    .tickFormat(d3.timeFormat("%Y"))
    .ticks(16);

	

	

	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height  +')')
		.call(xAxis)
	.selectAll('text')
		.attr('y', '0')
		.attr('x', '-27')
		.attr('dy', '1.20em')
		.style('text-anchor' , 'start');

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
	.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '0.78em')
		.style('text', 'end')
		.text('Value ($)');

	

	const myGraph = svg.selectAll('bar')
		.data(data)
	.enter().append('rect')
		.style('fill', 'steelblue')
		.attr('x', function(d) { return x(d.date); })
		.attr('width', x.bandwidth())
		.attr('y' , height)
		.attr('height', 0)
		.on('mouseover', function(d) {
			tooltip.transition()
				.style('opacity', 1)
			tooltip.html(d.date +                      
				"<br/>"  + d.gdp + "(in Millions)")	 
				.style('left', (d3.event.pageX) + 'px')
				.style('top', (d3.event.pageY - 28) + 'px')
			d3.select(this).style('opacity', 0.5)
		})
		.on('mouseout', function(d) {
			tooltip.transition()
				.style('opacity', 0)

			d3.select(this).style('opacity', 1)
		});


	myGraph.transition()
		.attr('height', function(d) {
			return height - y(d.gdp)
		})
		.attr('y', function(d) {
			return y(d.gdp)
		})
		.duration(animateDuration)
		.delay(function(d, i) {
			return i * animateDelay
		})
		.ease('elastic')







});




// can use data with just static data but i need to iterate through json.
//try converting it to csv first then d3 uses csv
