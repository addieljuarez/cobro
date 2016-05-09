// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


var arrayPre = Ti.App.Properties.getObject('arrayPrecios');


var data = [];


function list(){
	data = [];
	
	for(i in arrayPre){
		var row = Ti.UI.createTableViewRow({
			editable:true,
			layout:'horizontal',
			height:60,
			moveable:true,
			description1: arrayPre[i].nombre,
			precio : arrayPre[i].precio
		});
		
		var labelPrecio = Ti.UI.createLabel({
			color:'#000',
			left:5,
			text:'$' + (arrayPre[i].precio).toString(),
		});
		
		var labelDescription = Ti.UI.createLabel({
			color:'#000',
			left:15,
			text : arrayPre[i].nombre,
		});
		
		
		row.add(labelPrecio);
		row.add(labelDescription);
		data.push(row);
	}
	
	$.tableView.setData(data);
	
}


list();

$.editar.addEventListener('click', function(e){
	
});


$.winSettings.addEventListener('close', function(e){
	var arrayNew = [];
	for(i in data){
		var newData = {
			'nombre': JSON.stringify(data[i].description1),
		 	'precio' : data[i].precio,
		};
		
		// Ti.API.info(newData);
		
		arrayNew.push(newData);
	}
	
	Ti.API.info(arrayNew);
	// Ti.App.Properties.setObject('arrayPrecios', arrayNew);
	// Ti.App.fireEvent('refresh');
});



