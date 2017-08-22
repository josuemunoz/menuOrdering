
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
			
		// menu.filename =  "boxlunchmenu.json";
		menu.filename = "http://appdesignclub.com/test-data/boxlunchmenu.json";
		
	}
			return menu.filename;
		
		},
	
	
	
	theRequest: function(){
		//createCORSRequest("get", "http://appdesignclub.com/");
		//alert(menu.variables());
				if(menu.variables()){
					var x = "";
	 			x = new XMLHttpRequest();
				
				x.open("GET", menu.variables(), true);
				//Access-Control-Allow-Origin
				
				//x.setRequestHeader("Content-type", "Access-Control-Allow-Origin *");
		x.setRequestHeader("Content-type", "application/x-www-formAsh-urlencoded");
				x.onreadystatechange = function(){
					if(x.readyState == 4 && x.status == 200){
						var r = JSON.parse(x.responseText);
	//alert('c');
						theMenu = r;
						menu.displayMenu(r);	
					
					}
				}
				
				x.send();
				
				}
		 
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
		var xx = 0;
		var im = ["b.jpg","a.jpg"];
		var subImages = ["c.png", "d.png"];
		var numberImages = [10,25];
		for(key in obj){
			var li = document.createElement("ol");
			li.appendChild(menu.createTextNode(key));
			menu1.appendChild(li); 
			//create categorys images
			var image = document.createElement("img");
				image.setAttribute("src", im[j]); ++j;
				li.appendChild(image);
				
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>"+key);
			 
			 var x = obj[key];
			 for(test in x){
				 
			
				var li = document.createElement("li");
					li.setAttribute("id", x[test]['id']);
					li.setAttribute("title", x[test]['price']);
				var span = document.createElement("span");
					span.setAttribute("class", "additem");
					
				var spanA = document.createElement("span");
				
					
				 
				
				
			
			spanA.appendChild(menu.createTextNode(x[test]['item']));
			li.appendChild(spanA);
			
			span.appendChild(menu.createTextNode("Add Item $"+x[test]['price']));
			li.appendChild(span);
			menu1.appendChild(li); 
			
			
			////////////////////////////////////////////////////////////select
				
				 //images withing menu
					 //console.log(test + ">>>"+ im[test] +"     "+numberImages[xx]+ ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			
					 if(test == numberImages[xx]){
					//var or = document.createElement("li");
					image = document.createElement("img");
					image.setAttribute("src", subImages[xx]); 
					li.appendChild(image);
					 console.log(subImages[xx] +"     "+numberImages[xx]+ "IIIIIIIIIIIIIIIIIIIIIIIIII");
					 ++xx;
				 }
				
					
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
		 	
				
		 		var error = 0;
				var input = menuAPI.returnInputs("createAccount");
				var selectBox = this.selectTheOption("createAccount");
				
		 		formdata = new FormData();
				formdata.append("module", "createAccountMenu");
		 		formdata.append("company", selectBox[0].value);
		 for(var i=0; i<input.length; i++){
					
					console.log(input[i].id);
					if(input[i].value != ""){
					formdata.append(input[i].id, input[i].value);
					
					}else{
						
						++error;
						
						}
					}
					//alert(error);
					//alert(JSON.parse(formdata));
				if(error === 0){
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
		 
				}else{
					alert("Please fill all fields.");
					}
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
						localStorage.setItem("companyID", r.companyID);
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
			
			//alert(localStorage.getItem("userID"));
			  //if(menuAPI.byId(event.target.id).title){
				   if(event.target.className === "additem"){
		 if(localStorage.getItem("userID")){
		 var n = prompt("Number Of Items", 1);
		 if(n){
			// event.target.parentNode.innerHTML += '<span class="testing">Qty:'+n+"</span>";
			//alert(event.target.firstChild.nodeValue);
		//cat
		 event.target.parentNode.style.transition = "background 1s linear 0s";
		 event.target.parentNode.style.backgroundColor = "#336699";
		 event.target.parentNode.style.color = "#fff"; 
		// menuAPI.byId(event.target.id).style.color = "#fff";
		 cartCount += parseInt(n);
		 
		 
		 //this line gets the price
		 console.log(event.target.parentNode.title);
		 //console.log(theMenu[event.target.parentNode.title]);
		 cost += parseFloat(event.target.parentNode.title);
		 
		 totalCost += (event.target.parentNode.title*n);  
		 
		 console.log(cartCount+ " The cost: " + Math.round(cost *10) +"  ********************************");
		 menuAPI.byId("theCart").innerHTML = cartCount;
		 //event.target.firstChild.nodeValue+"-Quantity-"+n
		 
		 //console.log
		 var opt = document.getElementById(event.target.parentNode.id);
		 
		 var optNumbers = opt.getElementsByTagName("select");
		 console.log(optNumbers+":::::::::::::::::::::::::::::::::::::::::::::::::::::::");
		 console.log(optNumbers.length);
		 
		 newOptions = "";
		 for(theopt in optNumbers){
			 
			 if(optNumbers[theopt].value !== undefined){
				 
				 if((optNumbers[theopt]).selectedIndex != 0){
				 console.log(theopt +" "+ optNumbers[theopt].firstChild.value +"     "+optNumbers[theopt].value);
				 newOptions += optNumbers[theopt].firstChild.value +": "+ optNumbers[theopt].value+ ".  ";
				 
				 }
				 };
			 }
			 console.log(newOptions);
		//var simple = {"name": event.target.firstChild.nodeValue, "Quantity": n};
		MenuItemsBaby.push({"name": event.target.parentNode.firstChild.innerHTML,
		"userid": localStorage.getItem("userID"), 
		"fullname": localStorage.getItem("fullname"), 
		"quantity": n,
		"companyId": localStorage.getItem("companyID"),
		"totalCost": totalCost,
		"orderOption": newOptions,
		"price": event.target.parentNode.title, 
		"email": localStorage.getItem("email"),
		"idMenu_module": event.target.parentNode.id});
		//MenuItemsBaby.push(event.target.firstChild.nodeValue+  "Quantity "+n);
		
		 //MenuItemsBaby = array(event.target.firstChild.nodeValue+"-Quantity-"+n);
		//alert(MenuItemsBaby); 
		 menuAPI.byId("checkOut").innerHTML = "Check Out: "+cartCount+ " items "+ " Cost = $"+totalCost;//*cartCount;
		 }  
		 }else{ alert("Please log in to order."); }
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
		alert("You are login out.");
		//menuAPI.checkIfLoggedIn();
		
		menuAPI.toggleInOut();
		},
	
	toggleInOut: function(){
		
		if(menuAPI.checkIfLoggedIn() == false){
			
			menuAPI.byId("logMeOut").style.display = "none";
			
			menuAPI.byId("logiN").style.display = "block";
			
			menuAPI.byId("createAccount").style.display = "block";
			
			}else{
				
				menuAPI.byId("logMeOut").style.display = "block";
				
			menuAPI.byId("logiN").style.display = "none";
			
			menuAPI.byId("createAccount").style.display = "none";			
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
					x.open("POST", "http://appdesignclub.com/api/jm.php", true);
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
						cartCount = 0;
						totalCost = 0;
						MenuItemsBaby.length = 0;
						cost = 0;
						//i = 0;
						//Object.clear(MenuItemsBaby);
						//alert(MenuItemsBaby.length);
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
				
				if(menuAPI.byId(x[key].id).style.backgroundColor){	
				
				console.log(x[key].id + menuAPI.byId(x[key].id).style.backgroundColor);
				x[key].style.backgroundColor = "";
				x[key].style.color = "";
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


