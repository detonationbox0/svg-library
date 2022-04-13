
var key = undefined;

/**
 * DOCUMENT IS
 */
$(function() {
//#region
    console.log("Hello.");
//#endregion    
});

/**
 * USER CLICKS SEARCH BUTTON
 */
$("#btn-search").on("click", function() {
//#region
    // Get the search query
    var query = $("#query").val();

    // If query is empty, do nothing
    if (query.length == 0) {
        console.log("Please enter a search query.");
        return;
    }

    
    // Build URL including search query
    var url = `https://reserve.freesvg.org/api/v1/search?query=${encodeURI(query)}`;

    // Make AJAX request
    // Only if there's a key
    if (key != undefined) {

        var ajxReq = $.ajax({
            url:url,
            contentType:"application/json",
            dataType:"json",
            type:"GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + key);
            },
            success: function(msg) {

                // API Response:
                console.log(msg)

                // Clear current results
                $("#results").empty();

                var resultData = msg.data;

                for (var i = 0; i < resultData.length; i++) {

                    // Make a DOM element
                    var dom = `
                        <div class="img-thumb">
                            <img class="img" id="${resultData[i].id}" src="https://freesvg.org/img/${resultData[i].thumb}" svgid="${resultData[i].id}" svgname="${resultData[i].svg}" />
                            <pre class="svg-name">${resultData[i].svg}</pre>
                        </div>
                    `
                    $("#results").append(dom);
                }
            }
        }); 
    } else {
        alert("You do not have an access token.");
    }
//#endregion
});

/**
 * USER LOGS IN
 */
$("#login").on("click", function() {
//#region
    // Get username / password
    var un = $("#un").val();
    var pw = $("#pw").val();

    // if (un)

    // OAUTH
    var url = "https://reserve.freesvg.org/api/v1/auth/login"


    // Get the access token
    $.post('https://reserve.freesvg.org/api/v1/auth/login', {email:un, password:pw}, function(response){ 
    
        // Success
        key =  response.token;
        console.log(`Access Token: ${key}`);

        // Hide Login info, show search stuff;
        $("#login-area").hide();
        $("#app-container").show();
    }).fail(function(response) {
        // Error
        $("#problem").text(JSON.parse(response.responseText).error.message);
    });;


//#endregion
});

/**
 * USER CLICKS ON A SEARCH RESULT
 */
$(document).on("click", ".img-thumb", function() {
    var svgName = $(this).find("img").attr("svgname");

    // https://forum.freesvg.org/viewtopic.php?id=31
    var svgURL = `https://freesvg.org/storage/zip/blog/${svgName}`;

    window.open(svgURL);

})


/**
 * USER PRESSES ENTER TO LOG IN OR SEARCH
 */

$("#un, #pw").on("keydown", function(event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    console.log(key);
    if (key == 13) {
        $("#login").click();
    }
});

$("#query").on("keydown", function(event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    console.log(key);
    if (key == 13) {
        $("#btn-search").click();
    }
})

// document.getElementById("#un").addEventListener('keydown', function onEvent(event) {
//     if (event.key == "Enter") {
//         $("#login").click();
//     }
// });

// document.getElementById("#pw").addEventListener('keydown', function onEvent(event) {
//     if (event.key == "Enter") {

//     }
// })