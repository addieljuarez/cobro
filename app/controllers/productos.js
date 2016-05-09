
if(!Ti.App.Properties.hasProperty('prod')){
	 var prod = [
		 {
		 	'nombre': 'Productos de $8',
		 	'precio' : 8,
		 },
		 {
		 	'nombre': 'Productos de $10',
		 	'precio' : 10,
		 },
		 {
		 	'nombre': 'Productos de $12',
		 	'precio' : 12,
		 },
		 {
		 	'nombre': 'Productos de $15',
		 	'precio' : 15,
		 },
	];
	
	Ti.App.Properties.setObject('arrayPrecios', prod);
}
