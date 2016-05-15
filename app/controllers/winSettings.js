// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;





var data = [];


function addNew(){
	var viewAdd = Ti.UI.createScrollView({
		backgroundColor:'#BDBDBD',
		layout:'vertical',
	});
	
	var labelDesc = Ti.UI.createLabel({
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		color:'#000',
		font:{
			fontSize:18,
		},
		text:'Ingresa la descripción',
		top:20,
	});
	
	var inputDesc = Ti.UI.createTextField({
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		height:50,
		left:30,
		right:30,
		top:10,
		color:'#000',
		font:{
			fontSize:18,
		},
		hintText:'Descripción',
		returnKeyType:Ti.UI.RETURNKEY_NEXT,
	});
	
	var labelPrecio = Ti.UI.createLabel({
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		color:'#000',
		font:{
			fontSize:18,
		},
		text:'Ingresa el precio',
		top:30,
	});
	
	var buttonAceptarTool = Ti.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.DONE,
	});
	var space = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	});
	
	var toolBar =Ti.UI.iOS.createToolbar({
		items:[space,buttonAceptarTool],
	});
	var inputPrecio = Ti.UI.createTextField({
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		height:50,
		left:30,
		right:30,
		top:10,
		color:'#000',
		font:{
			fontSize:18,
		},
		hintText:'Precio',
		keyboardType:Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,
		keyboardToolbar:toolBar,
	});
	
	
	var viewButtons = Ti.UI.createView({
		top:20,
		height:50,
	});
	
	var buttonCancelar = Ti.UI.createButton({
		left:10,
		width:'40%',
		height:50,
		title:'Cancelar',
		backgroundColor:'#FF0040',
		color:'#fff',
	});
	
	var buttonAceptar = Ti.UI.createButton({
		right:10,
		width:'40%',
		height:50,
		title:'Agregar',
		backgroundColor:'#2E2EFE',
		color:'#fff',
	});

	viewAdd.add(labelDesc);
	viewAdd.add(inputDesc);
	viewAdd.add(labelPrecio);
	viewAdd.add(inputPrecio);
	viewAdd.add(viewButtons);
	viewButtons.add(buttonCancelar);
	viewButtons.add(buttonAceptar);
	$.winSettings.add(viewAdd);
	
	inputDesc.addEventListener('return', function(e){
		inputPrecio.focus();
	});
	
	buttonAceptarTool.addEventListener('click', function(e){
		inputPrecio.blur();
	});
	
	buttonCancelar.addEventListener('click', function(e){
		$.winSettings.remove(viewAdd);
	});
	
	buttonAceptar.addEventListener('click', function(e){
		if(inputDesc.value != '' && inputPrecio.value != ''){
			
			var newProducto = {
				'nombre': inputDesc.value,
		 		'precio' : inputPrecio.value,
			};
			
			var arrayNew = [];
			for(i in data){
				var newData = {
					'nombre': (data[i].description1).toString(),
				 	'precio' : data[i].precio,
				};
				
				arrayNew.push(newData);
			}
			arrayNew.push(newProducto);
			
	
			Ti.App.Properties.setObject('arrayPrecios', arrayNew);
			
			$.winSettings.remove(viewAdd);
			
			
			alert('Agregado');
			list();
			
		}else{
			alert('Para agregar un nuevo producto, no dejes campos vacios');
		}
	});
	
};


function list(){
	var arrayPre = Ti.App.Properties.getObject('arrayPrecios');
	data = [];
	
	for(i in arrayPre){
		var row = Ti.UI.createTableViewRow({
			editable:true,
			layout:'horizontal',
			height:60,
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
	addNew();
});


$.winSettings.addEventListener('close', function(e){
	var arrayNew = [];
	for(i in data){
		var newData = {
			'nombre': (data[i].description1).toString(),
		 	'precio' : data[i].precio,
		};
		
		arrayNew.push(newData);
	}
	
	Ti.App.Properties.setObject('arrayPrecios', arrayNew);
	Ti.App.fireEvent('refresh');
});


$.tableView.addEventListener('delete', function(e){
	delete data[e.index];
});



