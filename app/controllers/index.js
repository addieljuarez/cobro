

var primerArray = Alloy.createController('productos');

$.navigation.open();

var data = [];


function winCantidad(numero){
	
	var winCantidad = Ti.UI.createWindow({
		title:'Cantidad',
		backgroundColor:'#fff'
	});
	
	var aceptarCantidad = Ti.UI.createButton({
		bottom:0,
		left:0,
		right:0,
		height:50,
		backgroundColor:'#585858',
		title:'ACEPTAR',
		color:'#fff',
		font:{
			fontSize:25,
		}
	});
	
	var picker = Ti.UI.createPicker({
		// selectionIndicator:true,
	});
	var datPicker = [];
	
	// datPicker[0] = Ti.UI.createPickerRow({title:'tes'});
	
	for(var i=0; i<20; i++){
		var numeroString = (i).toString();
		datPicker[i] = Ti.UI.createPickerRow({title:numeroString}); 
	}
	
	picker.add(datPicker);
	winCantidad.add(picker);
	winCantidad.add(aceptarCantidad);
	$.navigation.openWindow(winCantidad); 
	
	aceptarCantidad.addEventListener('click', function(e){
		numero.setText(Number(picker.getSelectedRow(0).title));
		winCantidad.close();
	});
	
	
}



function printPrecios(){
	
	data = [];
	var arrayPrecios = Ti.App.Properties.getObject('arrayPrecios');
	
	for(i in arrayPrecios){
		var viewContainerPrecio = Ti.UI.createView({
			height:60,
			borderColor:'#D8D8D8',
			left:0,
			right:0,
			precio:arrayPrecios[i].precio,
		});
		
		var numeroCantiad = Ti.UI.createLabel({
			color:'#000',
			font:{
				fontWeight:'Bold',
				fontSize:20,
			},
			left:5,
			text:0,
			touchEnabled:false,
		});
		
		var descriptionProducto = Ti.UI.createLabel({
			text:arrayPrecios[i].nombre,
			color:'#000',
			font:{
				fontWeight:'Bold',
				fontSize:20,
			},
			left:70,
			touchEnabled:false,
		});
		
		
		
		$.scrollMain.add(viewContainerPrecio);
		viewContainerPrecio.add(numeroCantiad);
		viewContainerPrecio.add(descriptionProducto);
		
		viewContainerPrecio.numeroCantiad = numeroCantiad;
		data.push(viewContainerPrecio);
		
		
		viewContainerPrecio.addEventListener('click', function(e){
			winCantidad(e.source.numeroCantiad);
		});
		
				
		
		
	}
}

printPrecios();


$.buttonReset.addEventListener('click', function(e){
	for(i in data){
		data[i].numeroCantiad.setText(0);
	}
	$.title.setText('$0.00');
});


$.buttonTotal.addEventListener('click', function(e){
	var arraySuma = [];
	var total = 0;
	var conteo = 0;
	for(i in data){
		var totalIndividual = Number(data[i].precio) * Number(data[i].numeroCantiad.getText());
		Ti.API.info(totalIndividual);
		arraySuma.push(totalIndividual);
	}
	
	function sumatoria(conteoInt){
		if(conteoInt != arraySuma.length){
			total = total + arraySuma[conteoInt];
			sumatoria(conteoInt + 1);
		}else{
			$.title.setText('$'+total+'.00');
		}
	}
	
	sumatoria(conteo);
});


$.viewSettings.addEventListener('click', function(e){
	var winSettings = Alloy.createController('winSettings').getView();
	$.navigation.openWindow(winSettings);
});

Ti.App.addEventListener('refresh', function(e){
	printPrecios();
});
