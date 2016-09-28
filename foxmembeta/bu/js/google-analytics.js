var ansHeight;
var ansWidth;
function getAds()
{
//https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif


	var input = (document.getElementById('search-bar').value);
	var input2 = (document.getElementById("search-bar2").value);
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
input = input.replace(" ", "%20");
document.getElementById("ans").style.visibility = 'visible'
while(input.indexOf("+")!=-1 || input.indexOf("=")!=-1 || input.indexOf("^")!=-1 || input.indexOf(",")!=-1 || input.indexOf(">")!=-1 || input.indexOf("<")!=-1 || input.indexOf(" ")!=-1)
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
//	console.log(input);
    var xmlSource = 'http://api.wolframalpha.com/v2/query.jsp?appid='+input2+'&input='+input+'&banners=image&format=image,plaintext,imagemap&podstate=Input__Step-by-step+solution&width=1026&maxwidth=1596&mag=3.0';


    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");
//.log(yqlURL);
    $.getJSON(yqlURL, function(data){
        
       // console.log(JSON.stringify(data));
		var newData = JSON.stringify(data);
		if(newData.length<500)
		{
			getAds();
			return;
		}
		var newString = newData;
		if(newString.indexOf("Possible intermediate steps")!=-1)
		{
		getAds2(xmlSource);
		}
	//	console.log("00000000000000000000000000000000000");
		var startIndex = 0;
		for(var i =newString.indexOf('Step');newString.charAt(i)!='"';i--)
		{
		startIndex = i;
		}
		var podstate = newString.substring(startIndex,newString.indexOf('Step'));
		//console.log(podstate);
		
		var newUrl = 'http://api.wolframalpha.com/v2/query.jsp?appid='+input2+'&input='+input+'&banners=image&format=image,plaintext,imagemap&podstate='+podstate+'Step-by-step%20solution&width=1026&maxwidth=1596&mag=2.0';
		newUrl = newUrl.replace(" ","%20");
		console.log(newUrl);
		getAds2(newUrl);
		
		
		//integrate 9x^2-sin(x^(1/2))
		
		
		
		
		
		
		
    });}
function getAds2(url)
{

    var xmlSource = url;


    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");
//console.log(yqlURL);
      
    $.getJSON(yqlURL, function(data){
        
      // console.log(JSON.stringify(data));
		var newData = JSON.stringify(data);
		if(newData.length<500)
		{
			getAds2(url);
			return;
		}
		var index = 0;
		var index2 = 1;
		for(index = newData.indexOf("Possible intermediate steps");newData.substring(index,index+3)!="src";index+=1)
		{
	//		console.log(index);
		}
		//console.log(index);
		for(index2 = index+6;newData.substring(index2,index2+1)!='\"';index2+=1)
		{
		//	console.log(index2);
		}
		var newUrl = newData.substring(index+6,index2-1);
		newUrl = newUrl.replace("amp;","");
		//console.log(newUrl);
		getMeta(newUrl);
		
		//window.open(newUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
		//document.getElementById("ans").style.visibility = 'visible'
		//console.log(newUrl);
		
		
		
		
    });}
	function getMeta(url){   
    var img = new Image();
    img.onload = function(){
        ansHeight = this.height;
		ansWidth = this.width;
		document.getElementById("image").width = ansWidth;
		document.getElementById("image").height = ansHeight;
		document.getElementById("image").src = url;
		
    };
         img.src = url;
}

