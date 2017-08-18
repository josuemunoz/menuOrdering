
var i = 0;
 var menuAPI = {
	
	 
	 byList: function(){
		 
		 return document.getElementsByTagName("li");
		 
		 },
		 
	 byTagName: function(){
		 
		 return document.getElementsByTagName("input");
		 
		 },
		 
	returnInputs: function(place){
		
		return menuAPI.byId(place).getElementsByTagName("input");
		
		},
	 
	 selectTheOption: function(place){
		 
		 return menuAPI.byId(place).getElementsByTagName("select");
		
		 
		 },
		 
		clearTheForm: function(){
			
			var input = document.getElementsByTagName("input");
			
			
				for( x in input){
					
					menuAPI.byId(input[x].id).value= "";
					//console.log("......"+input[x].value);
					
					}
			
			
			},
	 
	  createAccount: function(){
		 
		 		
				var input = menuAPI.returnInputs("createAccount");
				var selectBox = this.selectTheOption("createAccount");
				
		 		formdata = new FormData();
				formdata.append("module", "createAccountMenu");
		 		formdata.append("company", selectBox[0].value);
		 for(var i=0; i<input.length; i++){
					
					console.log(input[i].id);
					if(input[i].value != ""){
					formdata.append(input[i].id, input[i].value);
					
					}
					}
					//alert(JSON.parse(formdata));
					
		 		var x = "";
		 		x = new XMLHttpRequest();
				
				x.open("POST", "http://appdesignclub.com/api/jm.php", true);
				//x.setRequestHeader("Content-type", "application/x-www-formAsh-urlencoded");
				x.onreadystatechange = function(){
					if(x.readyState == 4 && x.status == 200){
						var r ="";
							r = JSON.parse(x.responseText);
							//r = x.responseText;
						alert(r.status);
						
						if(r.error == 0){
						
							menuAPI.clearTheForm();	
						
						}
						
					
					}
				}
				
				x.send(formdata);
		 
		 
		 },
	 
	 LogMeIn: function(){
		 
		 		
				var input = menuAPI.returnInputs("logiN");
				
		 		formdata = new FormData();
				formdata.append("module", "menuLogIn");
		 
		 for(var i=0; i<input.length; i++){
					
					if(input[i].value != ""){
					formdata.append(input[i].id, input[i].value);
					}
					}
		 		var x = "";
		 		x = new XMLHttpRequest();
				
				x.open("POST", "http://appdesignclub.com/api/jm.php", true);
				//x.setRequestHeader("Content-type", "application/x-www-formAsh-urlencoded");
				x.onreadystatechange = function(){
					if(x.readyState == 4 && x.status == 200){
						var r ="";
							r = JSON.parse(x.responseText);
						
						if(r.error == 0){
						
						localStorage.setItem("userID", r.theuserid);
						localStorage.setItem("fullname", r.fullname);
						localStorage.setItem("email", r.email);
						menuAPI.toggleInOut();
						}
						alert(r.status);	
					
					}
				}
				
				x.send(formdata);
		 
		 
		 },
	 
	 byId: function(x){
			return document.getElementById(x);
		 
		 },
		 
	 setEvents: function(){
		 
		 var menu1 = menuAPI.byId("menu1");
		 //li.addEventListener("click", function(){
			 //alert("setevents()");
			 //alert("hello");
			 var f = document.getElementsByClassName("additem");
			 //})
		 menu1.addEventListener("click", menuAPI.addMenuItem, false);
		 
		  
		 },
		 
	 addMenuItem: function(event){
		 //alert("hi");
		//alert(event.target.className);

		 
		// if(event.target.id == "additem"){
			  //if(menuAPI.byId(event.target.id).title){
				   if(event.target.className === "additem"){
		 
		 var n = prompt("Number Of Items", 1);
		 if(n){
			// event.target.parentNode.innerHTML += '<span class="testing">Qty:'+n+"</span>";
			//alert(event.target.firstChild.nodeValue);
		
		 event.target.parentNode.style.transition = "background 1s linear 0s";
		 event.target.parentNode.style.backgroundColor = "#336699";
		 event.target.parentNode.style.color = "#fff"; 
		// menuAPI.byId(event.target.id).style.color = "#fff";
		 i++;
		 menuAPI.byId("theCart").innerHTML = i;
		 //event.target.firstChild.nodeValue+"-Quantity-"+n
		//var simple = {"name": event.target.firstChild.nodeValue, "Quantity": n};
		MenuItemsBaby.push({"name": event.target.parentNode.firstChild.innerHTML, 
		"userid": localStorage.getItem("userID"), 
		"fullname": localStorage.getItem("fullname"), 
		"quantity": n, 
		"price": 15, 
		"email": localStorage.getItem("email"),
		"idMenu_module": event.target.parentNode.id});
		//MenuItemsBaby.push(event.target.firstChild.nodeValue+  "Quantity "+n);
		
		 //MenuItemsBaby = array(event.target.firstChild.nodeValue+"-Quantity-"+n);
		//alert(MenuItemsBaby); 
		 menuAPI.byId("checkOut").innerHTML = "Check Out: "+MenuItemsBaby.length+ " items";
		 } 
		 }
		 },
	
	checkIfLoggedIn: function(){
		
		//return false;
		if(localStorage.getItem("userID")){
				
				
				return true;
					}else{
						
						
						return false;
					}
		},
		
	
	logOut: function(){
		
		localStorage.clear();
		//localStorage.setItem("userID", "")
		alert("will log you out.");
		//menuAPI.checkIfLoggedIn();
		
		menuAPI.toggleInOut();
		},
	
	toggleInOut: function(){
		
		if(menuAPI.checkIfLoggedIn() == false){
			
			menuAPI.byId("logMeOut").style.display = "none";
			menuAPI.byId("logiN").style.display = "block";
			}else{
				
				menuAPI.byId("logMeOut").style.display = "block";
			menuAPI.byId("logiN").style.display = "none";
				
				};
		
		},
	
	processOrder : function(){
		
			//alert(menuAPI.checkIfLoggedIn());
			//if(MenuItemsBaby){
				
				//alert(MenuItemsBaby.length);
				//};
				var x= "";
				if(localStorage.getItem("userID") && MenuItemsBaby.length != 0){
				
				x = new XMLHttpRequest();
				 //http://m.josue45.com/class/JosueMunoz.php?iduser=1&getLinks=true
				//x.open("post", "http://appdesignclub.com/data/api-menuAPI.php"+sendData, true);
					x.open("POST", "http://appdesignclub.com/data/api-menu.php", true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//var sendData = "?data="+"hello there";
			var json = JSON.stringify(MenuItemsBaby);
			//var json = MenuItemsBaby;
		sendData = json;
		
		//testing....................................................................................
				x.send(sendData);
				x.onreadystatechange = function(){
						if(x.readyState == 4 && x.status == 200){
							//var r = JSON.parse(x.responseText);
							//return jm.result = r;
						alert(x.responseText);
						MenuItemsBaby = [];
						menuAPI.byId("theCart").innerHTML = "";
						menuAPI.byId("checkOut").innerHTML = "No Items";
						menuAPI.colorListClear();
						}
						
				
				}}else{
					//fix
					alert("Please log in to process order or add items to cart.");
					}
			
		
		},
	colorListClear: function(){
		
		var x = menuAPI.byList();
			for(key in x){
				
				if(x[key].style != ""){	
				
				console.log(x[key].style);
				x[key].style = "";
				}
				}
		
		},
		
	showCheckOutMenu: function(event){
		
		var up = window.pageYOffset;
		//var current = 0; 
		
			if(up > current){
				//current++;
				//menuAPI.byId("checkOut").innerHTML = up.type + "-  "+ current;
				
				menuAPI.byId("checkOut").style.transition = "display 1s linear 0s"; 
				menuAPI.byId("checkOut").style.display = "none";
				
				}else{
					//current--;
					//menuAPI.byId("checkOut").innerHTML = up + "-  "+ current;
					
					menuAPI.byId("checkOut").style.transition = "display 2s linear 0s"; 
					menuAPI.byId("checkOut").style.display = "block";
					
					}
			current = up;
		}
		 
	 }


var menu = {
	
	
	variables: function(){
		
		//alert("a");
		//alert(window.location);
		menu.filename =  "http://appdesignclub.com/test-data/boxlunchmenu.json";
		if(document.location == "http://localhost/App_menu_ordering/"){
				    	//http://appdesignclub.com/test-data/boxlunchmenu.json
			 menu.filename =  "boxlunchmenu.json";
		}
		if(document.location == "file:///C:/Users/Josue%20Munoz/apps/menuOrdering/www/index.html"){
			
			 menu.filename =  "boxlunchmenu.json";
		//menu.filename = "http://appdesingclub.com/test-data/menu.php";
		
	}
			return menu.filename;
		
		},
	
	
	
	theRequest: function(){
		//createCORSRequest("get", "http://appdesignclub.com/");
		var x = "";
	 	x = new XMLHttpRequest();
				//menu.variables();
				//alert(menu.variables());
				x.open("GET", menu.variables(), true);
				//Access-Control-Allow-Origin
				
				//x.setRequestHeader("Content-type", "Access-Control-Allow-Origin *");
		x.setRequestHeader("Content-type", "application/x-www-formAsh-urlencoded");
				x.onreadystatechange = function(){
					if(x.readyState == 4 && x.status == 200){
						var r = JSON.parse(x.responseText);
	//alert('c');
						menu.displayMenu(r);	
					
					}
				}
				
				x.send();
		 
	},
	
	byId: function(x){
			
		return document.getElementById(x);
		
		},
		
	createTextNode: function(x){
		
		return document.createTextNode(x);
		
		},	

	displayMenu: function(obj){
		
		var menu1 = document.getElementById("menu1");
		//var menu1 = menu.byId("menu1");
		var count = 0;
		
		var j = 0;
		var im = ["menu4b.jpg", "menu3.jpg"];
		for(key in obj){
			var li = document.createElement("ol");
			li.appendChild(menu.createTextNode(key));
			menu1.appendChild(li); 
			var image = document.createElement("img");
	
				image.setAttribute("src", im[j]); ++j;
				li.appendChild(image);
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>"+key);
			 
			 var x = obj[key];
			 for(test in x){
				 
				var li = document.createElement("li");
					li.setAttribute("id", x[test]['id']);
				var span = document.createElement("span");
					span.setAttribute("class", "additem");
					
				var spanA = document.createElement("span");
				
				
			
			spanA.appendChild(menu.createTextNode(x[test]['item']));
			li.appendChild(spanA);
			
			span.appendChild(menu.createTextNode("Add Item $"+x[test]['price']));
			li.appendChild(span);
			menu1.appendChild(li); 
			
			
			////////////////////////////////////////////////////////////select
					
					//	var dropList = document.createElement("select");
					//  dropList.setAttribute("class", "dropList");
					//display the menu options
					var divW = document.createElement("div");
									divW.setAttribute("class", "niceList");
					for(theoptions in x[test]['options']){
						var div =  document.createElement("div");
						div.setAttribute("class", "box");	
							//console.log("main..."+theoptions);
							//createa select for the sandwhiches
							var dropList = document.createElement("select");
								//dropList.setAttribute("class", "box");
							var option = document.createElement("option");
								//option.value = theoptions;
								option.text = theoptions;
								dropList.appendChild(option);
								//divwrap.appendChild(dropList);
								div.appendChild(dropList);
							//console.log("main..."+theoptions+"---"+x[test]['options'][theoptions]);
								submenu = x[test]['options'][theoptions];
								
									for(op in submenu){
										
											var option = document.createElement("option");
												option.value = submenu[op];
												option.text = submenu[op];
												dropList.appendChild(option);
												//console.log("....."+submenu[op]);
										}
								
									divW.appendChild(div);
								li.appendChild(divW);
								//div.appendChild(dropList);
								//divwrap.appendChild(dropList);	
								//li.appendChild(dropList);
								
								
						}
				
					
					
					//li.appendChild(dropList);
					////////////////////////////////////////////////////////////select end
				 
		
				}
			}
		
		}
	
	
	}

	 
	


	