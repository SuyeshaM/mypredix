var Data = [];

function getManagerdata(){
    fetchConfig = {
    method: 'get',
		headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/html'
    }
	};

    fetch('/manager',fetchConfig)
    .then(function(response){
        console.dir("response");
        return response.json();
    })
	.then(function(jsonData){
        console.dir(jsonData);
		//var textarea = document.getElementById('displayarea');
		//textarea.value = JSON.stringify(jsonData);
        var managers = [];
        Data = jsonData;

        for(var i=0;i<jsonData.length;i++)
        {
            managers.push(jsonData[i].Manager);
        }
        console.log(managers);
        console.log("Set");
        managers = new Set(managers);
        console.log(managers);
        managers = Array.from(managers);

        var select = document.getElementById("manager");
        for(var i=0; i<managers.length;i++)
        {
            var option = document.createElement('option');
            option.innerHTML = managers[i];
            option.value = managers[i];
            select.appendChild(option);
        }
    })
}

function report(manager)
{
    console.log(Data);
    console.log(manager);
    var filterdetails = [];
    for(var i=0;i<Data.length;i++)
    {
        if(Data[i].Manager == manager)
        {
            filterdetails.push(Data[i]);
        }
    }
    var textarea = document.getElementById('displayarea');
    textarea.value = JSON.stringify(filterdetails);

    var col = [];
    for (var i=0;i<Data.length;i++)
    {
        for (var key in Data[i])
        {
            if(col.indexOf(key) === -1)
            {
                col.push(key);
            }
        }
    }
    console.log(col);

    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    for(var i=0;i<col.length;i++)
    {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < Data.length; i++) 
    {
        tr = table.insertRow(-1);
        if(Data[i].Manager == manager)
        {
            for (var j = 0; j < col.length; j++) 
            {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = Data[i][col[j]];
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}