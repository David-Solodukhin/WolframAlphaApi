var ansHeight;
var ansWidth;

function getAds()
{
	document.getElementById("myTextarea").style.visibility = 'hidden';
//https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif


	var input = (document.getElementById('search-bar').value);
	var input2 = (document.getElementById("search-bar2").value);
	var input3 = input;
if(input=="")
{
alert("Enter a query");
return;
}
if(input2.indexOf("-")==-1)
{
alert("invalid appid");
return;
}
document.getElementById("image").src = "https://youthradio.org/innovationlab/for-teachers/images/loading.gif";
document.getElementById("image").width = "42";
		document.getElementById("image").height = "42";
//input = input.replace(" ", "%20");
document.getElementById("ans").style.visibility = 'visible'
/*while(input.indexOf("+")!=-1 || input.indexOf("=")!=-1 || input.indexOf(",")!=-1 || input.indexOf("^")!=-1 || input.indexOf(">")!=-1 || input.indexOf("<")!=-1 || input.indexOf(" ")!=-1)
{
input = input.replace(" ", "%20");
input = input.replace("+","%2B");
input = input.replace("=","%3D");
input = input.replace("^","%5E");
input = input.replace(">","%3E");
input = input.replace("<","%3C");
input = input.replace(",","%2E");
input = input.replace("/","%2F" );
}
*/
input = encodeURIComponent(input);
	//////////console.log(input);
    var xmlSource = 'http://api.wolframalpha.com/v2/query.jsp?appid='+input2+'&input='+input+'&format=image,plaintext,imagemap&podstate=Input__Step-by-step+solution&width=1026&maxwidth=1596&mag=3.0';
    var xmlSource2  = 'http://api.wolframalpha.com/v2/query.jsp?appid='+input2+'&input='+input3+'&format=image,plaintext,imagemap&podstate=Input__Step-by-step+solution&width=1026&maxwidth=1596&mag=3.0';
//////////console.log(xmlSource);
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");
//.log(yqlURL);

////////////console.log(yqlURL);
var testUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27api.wolframalpha.com%2Fv2%2Fquery.jsp%3Fappid%3D"+input2+"%26input%3D"+encodeURIComponent(input)+"%26format%3Dimage%2Cplaintext%2Cimagemap%26podstate%3DInput__Step-by-step%2Bsolution%27&format=xml&callback=?";
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27api.wolframalpha.com%2Fv2%2Fquery.jsp%3Fappid%3D"+input2+"%26input%3D"+encodeURIComponent(input)+"%26format%3Dimage%2Cplaintext%2Cimagemap%26podstate%3DInput__Step-by-step%2Bsolution%27&format=xml&callback=?", function(data){
        
        //////////console.log(JSON.stringify(data));
		var newData = JSON.stringify(data);
console.log(newData);
		if(newData.length<500)
		{
			//////////console.log("not restarting");
			getAds();
			return;
		}
		var newString = newData;
		if(newString.indexOf("Possible intermediate steps")!=-1)
		{
			//////////console.log(newString)
		var index = 0;
		var index2 = 1;
		for(index = newData.indexOf("Possible intermediate steps");newData.substring(index,index+3)!="src";index+=1)
		{
	//		//////////console.log(index);
		}
		////////////console.log(index);
		for(index2 = index+6;newData.substring(index2,index2+1)!='\"';index2+=1)
		{
		//	//////////console.log(index2);
		}
		var newUrl = newData.substring(index+6,index2-1);
		newUrl = newUrl.replace("amp;","");
		////////////console.log(newUrl);
		getMeta(newUrl);
		return;
		}
	//	//////////console.log("00000000000000000000000000000000000");
		var startIndex = 0;
		for(var i =newString.indexOf('Step');newString.charAt(i)!='"';i--)
		{
		startIndex = i;
		}
		var podstate = newString.substring(startIndex,newString.indexOf('Step'));
		
		var newUrl = 'http://api.wolframalpha.com/v2/query.jsp?appid='+input2+'&input='+input+'&format=image,plaintext,imagemap&podstate='+podstate+'Step-by-step%20solution&width=1026&maxwidth=1596&mag=2.0';
		newUrl = newUrl.replace(" ","%20");
		//newUrl = encodeURIComponent(newUrl);
	console.log(podstate);
		console.log(newUrl);
		getAds2(testUrl,input,podstate);
		
		
		//integrate 9x^2-sin(x^(1/2))
		
		//select * from xml where url="http://api.wolframalpha.com/v2/query.jsp?appid=3H4296-5YPAGQUJK7&input=derivative%20y%3Dsqrt(1%2Bsin%5E3(xy%5E2))&format=plaintext,&podstate=Result__Step-by-step%20solution"
		
		
		
    });}
function getAds2(url,input,podstate)
{
	
	
	
	var input2 = (document.getElementById("search-bar2").value);
    var xmlSource = url;

	
	
	
	
	

     /*var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=json&callback=?"
    ].join("");
	*/
//console.log(yqlURL);
console.log("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27api.wolframalpha.com%2Fv2%2Fquery.jsp%3Fappid%3D"+input2+"%26input%3D"+encodeURIComponent(input)+"%26format%3Dimage%26podstate%3D"+encodeURIComponent(podstate)+"Step-by-step%2Bsolution%27&format=xml&callback=?");
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27api.wolframalpha.com%2Fv2%2Fquery.jsp%3Fappid%3D"+input2+"%26input%3D"+encodeURIComponent(input)+"%26format%3Dimage%26podstate%3D"+encodeURIComponent(podstate)+"Step-by-step%2Bsolution%27&format=xml&callback=?", function(data){
        
      console.log(JSON.stringify(data));
		var newData = JSON.stringify(data);
		if(newData.indexOf("Possible intermediate steps")==-1)
		{
			alert("Image solution could not be loaded, trying plaintext... Please wait and refresh if solution does not load in 15 seconds")
			//////////console.log("shit");
			//////////console.log(input);
			//getAds2(url,input,podstate);
			
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27api.wolframalpha.com%2Fv2%2Fquery.jsp%3Fappid%3D"+input2+"%26input%3D"+encodeURIComponent(input)+"%26format%3Dplaintext%26podstate%3D"+encodeURIComponent(podstate)+"Step-by-step%2Bsolution%27&format=xml&callback=?", function(data){
   var sData = JSON.stringify(data);
   
    sData = sData.substring(sData.indexOf("Possible intermediate steps"),sData.lastIndexOf("plaintext"));
	sData = sData.split("\\n").join("\n")
	document.getElementById("myTextarea").style.width = window.innerWidth+"px";
	 document.getElementById("myTextarea").style.height = window.innerHeight-300+"px";
	document.getElementById("myTextarea").value = sData;
	 
			});
			document.getElementById("myTextarea").style.visibility = 'visible';
			document.getElementById("ans").style.width = window.innerWidth+"px";
		document.getElementById("ans").style.height = window.innerHeight-400+"px";
			
			document.getElementById("ans").style.visibility = 'hidden'
			return;
		}
		var index = 0;
		var index2 = 1;
		for(index = newData.indexOf("Possible intermediate steps");newData.substring(index,index+3)!="src";index+=1)
		{
	//		//////////console.log(index);
		}
		////////////console.log(index);
		for(index2 = index+6;newData.substring(index2,index2+1)!='\"';index2+=1)
		{
		//	//////////console.log(index2);
		}
		var newUrl = newData.substring(index+6,index2-1);
		newUrl = newUrl.replace("amp;","");
		////////////console.log(newUrl);
		getMeta(newUrl);
		
		//window.open(newUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
		//document.getElementById("ans").style.visibility = 'visible'
		////////////console.log(newUrl);
		
		
		
		
    });}
	function getMeta(url){   
    var img = new Image();
    img.onload = function(){
        ansHeight = this.height;
		ansWidth = this.width;
		document.getElementById("image").width = ansWidth;
		document.getElementById("image").height = ansHeight;
		document.getElementById("image").src = url;
		document.getElementById("ans").style.width = (ansWidth+20)+"px";
		document.getElementById("ans").style.height = window.innerHeight-400+"px";
		
    };
         img.src = url;
}
var mycallback = function(data){
	alert(data);
}