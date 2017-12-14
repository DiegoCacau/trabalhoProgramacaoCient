jQuery(document).ready(function() {


	jQuery("#rodar").click(function(){
		var cols = document.getElementById("myTable").rows.length;
		for (var i=0; i<cols-1; i++){
			document.getElementById('myTable').deleteRow(-1);
		}
		var tempo = parseInt(document.getElementById("tempo").value);
		var aga = document.getElementById("aga").value;
		var rk1 = initRk1(tempo,aga);
		var rk2 = initRk2(tempo,aga);
		var rk3 = initRk3(tempo,aga);
		var rk4 = initRk4(tempo,aga);
		var mult = multipleSteps(tempo,aga,rk1);
		var imp = implicitMethod(tempo,aga,rk1);

		populateTable(aga,rk1,rk2,rk3,rk4,mult,imp);
		
		jQuery(".hid").css("display","inline-table");

	});


	jQuery("#tempo").keydown(function (e) {
        if (jQuery.inArray(e.keyCode, [8, 9, 27, 13, 110, 188]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    jQuery("#aga").keydown(function (e) {
        if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 188]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    function f(t,v){
    	var k = 0.002;
    	var m = 0.11;
    	var g = -9.8;

    	return (m*g - k*v*Math.abs(v))/m;
    }

    function initRk1(temp, p, vIn=8){
    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0;
    	var vInicial = 8;


    	for(var i = passo; i<temp; i=i+passo){

    		if(result.length < 1){
	    		m0 = passo*f(i,vInicial);
	    		result.push(vInicial + m0);
	    	}
	    	else{
	    		v = result[result.length -1];
	    		m0 = passo*f(i,v);
	    		result.push(v + m0);
	    	}

    	}

    	return result;

    }

    function initRk2(temp, p, vIn=8){
    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0,m1;
    	var vInicial = 8;


    	for(var i = passo; i<temp; i=i+passo){
    		
    		if(result.length < 1){
	    		m0 = passo*f(i,vInicial);
	    		m1 = passo*f(i+passo,vInicial+m0);
	    		result.push(vInicial + (m0+m1)/2);
	    		console.log(vInicial + (m0+m1)/2,i);
	    	}
	    	else{
	    		v = result[result.length -1];
	    		m0 = passo*f(i,v);
	    		m1 = passo*f(i+passo,v+m0);
	    		result.push(v + (m0+m1)/2);
	    		console.log(v + (m0+m1)/2,i);
	    	}

    	}

    	return result;

    }

    function initRk3(temp, p, vIn=8){
    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0,m1,m2;
    	var vInicial = 8;


    	for(var i = passo; i<temp; i=i+passo){
    		
    		if(result.length < 1){
	    		m0 = passo*f(i,vInicial);
	    		m1 = passo*f(i+(passo/2),vInicial+(m0/2));
	    		m2 = passo*f(i+passo,vInicial-m0+2*m1);
	    		result.push(vInicial + (m0+4*m1+m2)/6);
	    		console.log(vInicial + (m0+4*m1+m2)/6,i);
	    	}
	    	else{
	    		v = result[result.length -1];
	    		m0 = passo*f(i,v);
	    		m1 = passo*f(i+(passo/2),v+(m0/2));
	    		m2 = passo*f(i+passo,v-m0+2*m1);
	    		result.push(v + (m0+4*m1+m2)/6);
	    		console.log(v + (m0+4*m1+m2)/6,i);
	    	}

    	}

    	return result;

    }

    function initRk4(temp, p, vIn=8){
    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0,m1,m2,m3;
    	var vInicial = 8;


    	for(var i = passo; i<temp; i=i+passo){

    		if(result.length < 1){
	    		m0 = passo*f(i,vInicial);
	    		m1 = passo*f(i+(passo/2),vInicial+(m0/2));
	    		m2 = passo*f(i+(passo/2),vInicial+(m1/2));
	    		m3 = passo*f(i+passo,vInicial+m2);
	    		result.push(vInicial + (m0+2*m1+2*m2+m3)/6);
	    		console.log(vInicial + (m0+2*m1+2*m2+m3)/6,i);
	    	}
	    	else{
	    		v = result[result.length -1];
	    		m1 = passo*f(i+(passo/2),v+(m0/2));
	    		m2 = passo*f(i+(passo/2),v+(m1/2));
	    		m3 = passo*f(i+passo,v+m2);
	    		result.push(v + (m0+2*m1+2*m2+m3)/6);
	    		console.log(v + (m0+2*m1+2*m2+m3)/6,i);
	    	}

    	}

    	return result;

    }

    
    function implicitMethod(temp, p, arr1, vIn=8){
    	//método dos trapézios

    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0,m1;
    	var vInicial = 8;
    	var cont = 0;

    	for(var i = passo; i<temp; i=i+passo){
    

    		
    		if(result.length < 1){
	    		
	    		m0 = f(i-passo,vInicial);
	    		m1 = (passo*f(i,vInicial))+vInicial;
	    		m1 = f(i,m1);

	    		result.push(vInicial + ((m0+m1)*passo)/2);
	    		
	    		
	    	}
	    	else{

	    		v = result[result.length -1];
	    		m0 = f(i-passo,v);
	    		m1 = (passo*f(i,v))+v;
	    		m1 = f(i,m1);
	    		result.push(v + ((m0+m1)*passo)/2);
	    		
	    	}

    	}

    	return result;
    }

    function multipleSteps(temp, p,arr1, vIn=8){
    	//Adams-Bashforth

    	var passo = p.replace(",", ".");
    	passo = Number(passo);
    	var result = [];
    	var m0,m1;
    	var vInicial = 8;

    	for(var i = passo+passo; i<temp; i=i+passo){
   
    		
    		if(result.length < 1){
	    		result.push(arr1[0]);
	    		m0 = f(i-passo,8);
	    		m1 = f(i,arr1[0]);
	    		result.push(arr1[0]+(passo/2)*(3*m1-m0));
	    	}
	    	else{
	    		v2 = result[result.length -2];
	    		v1 = result[result.length -1];
	    		m0 = f(i-passo,v2);
	    		m1 = f(i,v1);
	    		result.push(v1+(passo/2)*(3*m1-m0));

	    	}

    	}

    	return result;
    }

    function populateTable(passo,arr1,arr2,arr3,arr4,arr5,arr6){
    	var table = document.getElementById("myTable");
    	passo = Number(passo.replace(",", "."));
	    var tempo = 0;

    	for(var i=0; i<arr1.length; i++){
    		tempo = tempo + passo;
    		var row = table.insertRow(-1);
		    var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    var cell4 = row.insertCell(3);
		    var cell5 = row.insertCell(4);
		    var cell6 = row.insertCell(5);
		    var cell7 = row.insertCell(6);
		    cell1.innerHTML = String(tempo.toFixed(2));
		    cell2.innerHTML = String(arr1[i].toFixed(8));
	    	cell3.innerHTML = String(arr2[i].toFixed(8));
	    	cell4.innerHTML = String(arr3[i].toFixed(8));
	    	cell5.innerHTML = String(arr4[i].toFixed(8));
	    	cell6.innerHTML = String(arr5[i].toFixed(8));
	    	cell7.innerHTML = String(arr6[i].toFixed(8));

			cell1.setAttribute("scope","row");	    	

    	}
    }

});