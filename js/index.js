var app = 
{
    // Application Constructor
    initialize: function() 
    {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() 
    {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() 
    {
        app.receivedEvent();
    },
    // Update DOM on a Received Event
    receivedEvent: function() 
    {
        console.log('Received Event');
        $.ajax
        ({
            url: "http://www.indianconspiracystories.com/feed/",
            async: true,
            beforeSend: function()
            {
               //$.mobile.showPageLoadingMsg(true);
            },
            complete: function()
            {
               //$.mobile.hidePageLoadingMsg();
            },
            success: function (data)
            {
                var $xml = $(data) , count = 1;
                $xml.find("item").each(function() 
                {
                    var item = {} , listContent = "";
                    var $this = $(this),
                    item = 
                    {
                        title: $this.find("title").text(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                        author: $this.find("author").text(),
                        content : $this.find("encoded").text()
                    }
                    
                    localStorage.setItem("itemHead" + count , item.title );
                    localStorage.setItem("itemDes" + count , item.content );
                    
                    listContent = '<li><a href="#" onclick="detailOfItem('+count+')">'+ item.title +'</a></li>';
                    console.log(listContent);
                    $("#appendList").append(listContent);
                    $('#appendList').listview('refresh');
                });
            },
            error: function (request,error)
            {
                //$.mobile.hidePageLoadingMsg();
                console.log('Network error has occurred please try again!' + error);
            }
        });
    }
};

function detailOfItem(count)
{
    var itemObj = localStorage.getItem("itemDes" + count);
    $.mobile.changePage("#detail", { transition: "none" });
    $("#detailDes").html(itemObj);
}
