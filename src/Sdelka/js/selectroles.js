$(document).ready( function(){
    
    $(document).on("click","#button1", function(){
        $.ajax({
            url: "../php/RoleToSession.php",
            type: "POST",
            dataType: "html",
            data : ({roles: 1}),
            success: function(data){ 
                location.href="index.php?option=users";
            }
        })
    })
    
    $(document).on("click","#button2", function(){
        $.ajax({
            url: "../php/RoleToSession.php",
            type: "POST",
            dataType: "html",
            data : ({roles: 2}),
            success: function(data){ 
                location.href="index.php?option=users";
            }
        })
    })
    
    $(document).on("click","#button3", function(){
        $.ajax({
            url: "../php/RoleToSession.php",
            type: "POST",
            dataType: "html",
            data : ({roles: 3}),
            success: function(data){ 
                location.href="index.php?option=users";
            }
        })
    })
    
 /*  $(document).on("click",".dovbutton", function(){
        var but = parseInt($(this).attr('id'))+100;
        console.log(but);
        $.ajax({
            url: "../php/RoleToSession.php",
            type: "POST",
            dataType: "html",
            data : ({roles: but}),
            success: function(data){ 
                location.href="index.php?option=users";
            }
        })
    })
    */
})
