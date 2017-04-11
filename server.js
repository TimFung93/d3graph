
const express 			= require('express');
const app 				= express();

const PORT = 8080;



app.use(express.static('public'))


app.listen(PORT, () => {
	console.log('started server on http://localhost' + PORT)
	console.log('Press Ctrl + C to kill server')
});