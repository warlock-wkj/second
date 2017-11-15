function jsonp(json){

	// json = {url: ,data: {wd: 'a',cb: fnName},cbName: 'cb',success: function (str) {}}
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	
	var fnName='jsonp'+Math.random();// jsonp021321321312321
	fnName=fnName.replace('.','');
	
	window[fnName]=function(a){ // 数据一定有
		json.success && json.success(a);
		
		oHead.removeChild(oS);
	};
	
	json.data[json.cbName]=fnName;
	
	var arr=[];
	for(var name in json.data){
		arr.push(name+'='+json.data[name]);
	}
	
	var str=arr.join('&');
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+str;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}