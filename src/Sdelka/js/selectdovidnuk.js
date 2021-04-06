$(document).ready(function(){
    var id, id_but, id_dov, selectobj, selectid, rowpadding, tabcount, butclick;
    
    $(document).on("click",".dovbutton", function(){
        var but = parseInt($(this).attr('id'))+100;
        butclick = $(this);
        $('.MainDovidnuk').empty();
        selectid = -1;
        selectobj = null;
        var str = '';
        var id = -9;
        $.ajax({
            url: "../php/RoleToSession.php",
            type: "POST",
            dataType: "html",
            data : ({roles: but}),
            success: function(data){ 
                $.ajax({
                    url: "../php/dovidnuk_user_select.php",
                    type: "POST",
                    dataType: "html",
                    data : ({roles: but}),
                    success: function(data){ 
                        data = JSON.parse(data);
console.log("../php/dovidnuk_user_select.php");                        
console.log(data);                        
                        str += "<div>";
                        for (var i = 0; i < data.length; i++){
                            str += "<p><label>"+data[i][0]+"</label><select class = 'users_select' id = '"+data[i][2]+"'>";   
                            if (data[i][1].length > 1) {
                                str += "<option value = '-1'></option>";
                                id = -1;
                            } else {
                                id = data[i][1][0][0];
                            }
                            for(var j = 0; j < data[i][1].length; j++){
                                str += "<option value = '"+data[i][1][j][0]+"'>"+data[i][1][j][1]+"</option>";
                            } 
                            str += "</select></p>";    
                        }
                        str += "</p></div>"; 
                        $('.MainDovidnuk').append(str);
                        if (id == -9 || id != -1) {
                            $.ajax({
                                url: "../php/dovidnuk_button.php",
                                type: "POST",
                                dataType: "html",
                                data : ({roles: but}),
                                success: function(data){ 
                                    data = JSON.parse(data);
console.log("../php/dovidnuk_button.php");                        
console.log(data);                        
                                    str = "<div class = 'tablesdovidbutton'>"; 
                                    var databutt = {};
                                    var j = 0;
                                    str += "<p>";    
                                    for (var i = 0; i < data.length; i++){
                                        if (data[i]['in_row'] == 0)
                                            str += "<button id = '"+data[i]['id_button']+"' value = '"+data[i]['id_dovidnuk']+"'>"+data[i]['name_button']+"</button>";
                                        if (data[i]['in_row'] == 1){
                                            databutt[j] = {};
                                            databutt[j]['id_button'] = data[i]['id_button'];
                                            databutt[j]['id_dovidnuk'] = data[i]['id_dovidnuk'];
                                            databutt[j]['name_button'] = data[i]['name_button'];
                                            j++;
                                        }
                                    }
                                    str += "</p></div>"; 
                                    $.ajax({
                                        url: "../php/dovidnuk_table.php",
                                        type: "POST",
                                        dataType: "html",
                                        data : ({roles: but}),
                                        success: function(data){ 
                                            data = JSON.parse(data);
console.log("../php/dovidnuk_table.php");                        
console.log(data);                        
                                            
                                            str += "<table class = 'TableDespatch'><tr><th><input type='radio' class='tableradio' name='tableradio' value=-1 checked></th>";
                                            for (var i = 0; i < data.length; i++){
                                                str += "<th id = '"+data[i]['name_table']+"'>"+data[i]['name_col']+"</th>";
                                            }
                                            for (i = 0; i < j; i++){
                                                str += "<th></th>";
                                            }
                                            str += "</tr><tr class = 'tablerow' data-id = 0><td data-fields = 'id'><input type='radio' class='tableradio' name='tableradio' value=0></td>";
                                            for (var i = 0; i < data.length; i++){
                                                str += "<td data-fields = '"+data[i]['name_table']+"'></td>";
                                            }
                                            for (i = 0; i < j; i++){
                                                str += "<td></td>";
                                            }
                                            str += "</tr>";
                                            $.ajax({
                                                url: "../php/dovidnuk_data.php",
                                                type: "POST",
                                                dataType: "html",
                                                data : ({roles: but, id: id}),
                                                success: function(data){ 
                                                    data = JSON.parse(data);
console.log("../php/dovidnuk_data.php");                        
console.log(data);                        
                                                    
                                                    if (data.length > 0){
                                                        for (var i = 0; i < data.length; i++){
                                                            str += "<tr class = 'tablerow' data-id = "+data[i][0]+"><td data-fields = 'id'><input type='radio' class='tableradio' name='tableradio' value="+data[i][0]+"></td>"; 
                                                            for (p in data[i]){
                                                                if (p != 0){
                                                                    if (data[i][p] != null){
                                                                        str += "<td data-fields = '"+p+"'>"+data[i][p]+"</td>";
                                                                    } else {
                                                                        str += "<td data-fields = '"+p+"'></td>";
                                                                    }
                                                                }
                                                            }
                                                            for (var k = 0; k < j; k++){
                                                                console.log("<td><button id = '"+databutt[k]['id_button']+"' data-id = '"+data[i][0]+"' data-dovidnuk = '"+databutt[k]['id_dovidnuk']+"'>"+databutt[k]['name_button']+"</button></td>");
                                                                str += "<td><button class = 'buttoninrow' id  = '"+databutt[k]['id_button']+"' data-id = '"+data[i][0]+"' data-dovidnuk = '"+databutt[k]['id_dovidnuk']+"'>"+databutt[k]['name_button']+"</button></td>";
                                                            }
                                                            str += "</tr>";
                                                        }
                                                    }
                                                    str += "</tr></table>";
                                                    $('.MainDovidnuk').append(str);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } 
                    }
                })
            }
        })
    })
    
    $(document).on("change", ".users_select", function(){
        var but = parseInt($(this).attr('id'))+100;
        selectid = -1;
        selectobj = null;
        var str = '';
        var id = $(this).val();
        $('table.TableDespatch').remove();
        $('div.tablesdovidbutton').remove();
console.log($(this).val());        
        $.ajax({
            url: "../php/dovidnuk_button.php",
            type: "POST",
            dataType: "html",
            data : ({roles: but}),
            success: function(data){ 
                data = JSON.parse(data);
console.log("../php/dovidnuk_button.php");                        
console.log(data);                        
                
                str = "<div class = 'tablesdovidbutton'>"; 
                var databutt = {};
                var j = 0;
                str += "<p>";    
                for (var i = 0; i < data.length; i++){
                    if (data[i]['in_row'] == 0)
                        str += "<button id = '"+data[i]['id_button']+"' value = '"+data[i]['id_dovidnuk']+"'>"+data[i]['name_button']+"</button>";
                    if (data[i]['in_row'] == 1){
                        databutt[j] = {};
                        databutt[j]['id_button'] = data[i]['id_button'];
                        databutt[j]['id_dovidnuk'] = data[i]['id_dovidnuk'];
                        databutt[j]['name_button'] = data[i]['name_button'];
                        j++;
                    }
                }
                str += "</p></div>"; 
                $.ajax({
                    url: "../php/dovidnuk_table.php",
                    type: "POST",
                    dataType: "html",
                    data : ({roles: but}),
                    success: function(data){ 
                        data = JSON.parse(data);
console.log("../php/dovidnuk_table.php");                        
console.log(data);                        
                        
                        str += "<table class = 'TableDespatch'><tr><th><input type='radio' class='tableradio' name='tableradio' value=-1 checked></th>";
                        for (var i = 0; i < data.length; i++){
                            str += "<th id = '"+data[i]['name_table']+"'>"+data[i]['name_col']+"</th>";
                        }
                        for (i = 0; i < j; i++){
                            str += "<th></th>";
                        }
                        str += "</tr><tr class = 'tablerow' data-id = 0><td data-fields = 'id'><input type='radio' class='tableradio' name='tableradio' value=0></td>";
                        for (var i = 0; i < data.length; i++){
                            str += "<td data-fields = '"+data[i]['name_table']+"'></td>";
                        }
                        for (i = 0; i < j; i++){
                            str += "<td></td>";
                        }
                        str += "</tr>";
                        $.ajax({
                            url: "../php/dovidnuk_data.php",
                            type: "POST",
                            dataType: "html",
                            data : ({roles: but, id: id}),
                            success: function(data){ 
                            data = JSON.parse(data);
console.log("../php/dovidnuk_data.php");                        
console.log(data);                        
                            
                                if (data.length > 0){
                                    for (var i = 0; i < data.length; i++){
                                        str += "<tr class = 'tablerow' data-id = "+data[i][0]+"><td data-fields = 'id'><input type='radio' class='tableradio' name='tableradio' value="+data[i][0]+"></td>"; 
                                        for (p in data[i]){
                                            if (p != 0){
                                                if (data[i][p] != null){
                                                    str += "<td data-fields = '"+p+"'>"+data[i][p]+"</td>";
                                                } else {
                                                    str += "<td data-fields = '"+p+"'></td>";
                                                }
                                            }
                                        }
                                        for (var k = 0; k < j; k++){
                                            console.log("<td><button id = '"+databutt[k]['id_button']+"' data-id = '"+data[i][0]+"' data-dovidnuk = '"+databutt[k]['id_dovidnuk']+"'>"+databutt[k]['name_button']+"</button></td>");
                                            str += "<td><button class = 'buttoninrow' id  = '"+databutt[k]['id_button']+"' data-id = '"+data[i][0]+"' data-dovidnuk = '"+databutt[k]['id_dovidnuk']+"'>"+databutt[k]['name_button']+"</button></td>";
                                        }
                                        str += "</tr>";
                                    }
                                }
                                str += "</tr></table>";
                                $('.MainDovidnuk').append(str);
                            }
                        })
                    }
                })
            }
        })
    })
    
    $(document).on("click", "#SelectFromIspro", function(){
        $.ajax({
            url: "../php/dovidnuk_add_ispro.php",
            type: "POST",
            success: function(data){ 
//                data = JSON.parse(data);
console.log("../php/dovidnuk_add_ispro.php");                        
console.log(data);                        
                $(butclick).click();
            }
        })
    })
    
    $(document).on("dblclick", ".tablerow", function(){
        if (selectid == -1) {
            var ch = $(this).children();
            var f, str;
            selectid = $(this).data("id");
            selectobj = $(this);
            var tabind = 0;
            for (var i = 0; i < ch.length; i++){
                f = ch.eq(i).data("fields");
                rowpadding = ch.css('padding');
                ch.eq(i).css("padding", '0');
                if (f == 'id'){
                    ch1 = $(ch.eq(i)).children();
                    ch1.eq(0).hide();
                } else if (ch.eq(i).data('fields').indexOf('dat') != -1){
                    str = "<input type='date' class = 'dovinputtable' data-oldvalue = '"+ch.eq(i).html()+"' value = '"+ch.eq(i).html()+"' data-tabind = "+tabind+">";
                    ch.eq(i).html(str);
                    tabind++;
                } else {
                    str = "<input type='text' class = 'dovinputtable' data-oldvalue = '"+ch.eq(i).html()+"' value = '"+ch.eq(i).html()+"' data-tabind = "+tabind+">";
                    ch.eq(i).html(str);
                    tabind++;
                }
                ch.eq(i).children().eq(0).css('height', ch.eq(i).css('height'));
            }
            tabcount = tabind-1;
        } else {
            
        }
    })
    
    $(document).click(function(e){
        if ( selectid != -1){
            var ctr = $(e.target).closest('tr');
            var id = ctr.data('id');
            var fields = [];
            if ( id != selectid){
                var ctd = selectobj.children();
                var isupdate = 0;
                ctd.eq(0).children().eq(0).show();
                var id1 = selectid;
                for (var i = 1; i < ctd.length; i++){
                    var str = ctd.eq(i).children().eq(0).val();
                    var strold = ctd.eq(i).children().eq(0).data('oldvalue'); 
                    fields[i-1] = [$(ctd.eq(i)).data('fields'),strold, str];
                    if (str != strold) isupdate = 1;
                    ctd.eq(i).html(str);
                    ctd.eq(i).css('padding', rowpadding);
                }        
                if (isupdate == 1/*1*/) {
                    $.ajax({
                        url: "../php/dovidnuk_ins_upd.php",
                        type: "post",
                        datatype: "html",
                        data: ({datafieelds:JSON.stringify(fields),upd:'1', id:selectid}),
                        success: function(data){
console.log("../php/dovidnuk_ins_upd.php");                        
console.log(data);                        
                            $(butclick).click();
                        }
                    }); 
                }
                selectid = -1;
//                tabcount = 0;
                selectobj = null;
            }
        }    
    })
    
    $(document).on("click", ".tableradio", function(){
        if ($(".tableradio:checked").val() > 0){
            if (confirm("Ви дійсно бажаєте видалити обрані дані?")) {  
                var id1 = $(".tableradio:checked").val();
                $.ajax({
                    url: "../php/dovidnuk_del.php",
                    type: "post",
                    datatype: "html",
                    data: ({id:id1}),
                    success: function(data){
                        console.log(data);
                        $(butclick).click();
                    }
                });                  
            }
        }
    })

    $(document).on("click", "#confirmpass", function(){
        var pass = $('#pass').val();
        var pass1 = $('#pass1').val();
console.log(id);        
        if (pass == '') {
            alert( "Введіть пароль");
            $("#pass").focus();
        } else {
            if (pass1 == '') {
                alert( "Пароль не підтвердженно");
                $("#pass1").focus();
            } else {
                if ( pass === pass1){
                    $.ajax({
                        url: "../php/dovidnuk_password.php",
                        type: "post",
                        datatype: "html",
                        data: ({passwordnew: pass, userid: id}),
                        success: function(data){
                            console.log(data);
                            $('#modal_close, #overlay').click();
                        }
                    });
                } else {
                    alert("Невірно вказаний пароль!!!");
                    $('#pass').val("");
                    $('#pass1').val("");
                    $("#pass").focus();
                }
            }
        }
    })
    
    $(document).on("click", ".buttoninrow", function(){
        var str = '';
        if ($(this).attr('id') == 'AddParoll')    {
console.log('#AddParoll');            
            id = $(this).data("id");
            $('#addpass').remove();
            $('#addpidr').remove();
            str = "<form id='addpass' method = 'POST'><p><label>Введіть пароль</label></p><p><input type='password' id='pass' required></p><p><label>Підтвердіть пароль</label></p><p><input type='password' id='pass1' required></p><p><input type='button' id='confirmpass' value='Зберегти'><input type='button' id='exitpidr' value='Вийти'></p></form>";
            $('#modal_form').append(str);
            $('#modal_form').css('height', 160);
            $('#modal_form').css('width',180);
            var winH = $(window).height();
            var winW = $(window).width();
            $('#modal_form').css('top', winH/2-$('#modal_form').height()/2);
            $('#modal_form').css('left', winW/2-$('#modal_form').width()/2);
            event.preventDefault(); // выключaем стaндaртную рoль элементa
            $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
                function(){ // пoсле выпoлнения предъидущей aнимaции
                    $('#modal_form') 
                        .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                        .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
            });
        } else {
console.log('#AddPidrozdil');            
            id = $(this).data("id");
            id_dov = $(this).data("dovidnuk");
            id_but = $(this).attr("id");
console.log(id);        
console.log(id_but);        
console.log(id_dov);        
            $('#addpass').remove();
            $('#addpidr').remove();
            $.ajax({
                url: "../php/dovidnuk_ref_data_table.php",
                type: "post",
                datatype: "html",
                data: ({data_id: id, data_but: id_but, data_dov: id_dov}),
                success: function(data){
                    data = JSON.parse(data);
console.log("../php/dovidnuk_ref_data_table.php");                        
console.log(data);                        
                    
                    str = "<form id='addpidr' method = 'POST' ><p height = '90%'><ul>";
                    for (var i = 0; i < data.length; i++){
                        if (data[i]['checkes'] == 0){
                           str += "<li><label><input type='checkbox' name = 'chk' value = '"+data[i]['id']+"'>";
                           for (var key in data[i]){
                               if (key != 'id' && key != 'checkes') str += data[i][key]+"   ";
                           }
                           str += "</label></li>";
                        } else {
                           str += "<li><label><input type='checkbox' name = 'chk' value = '"+data[i]['id']+"' checked>";
                           for (var key in data[i]){
                               if (key != 'id' && key != 'checkes') str += data[i][key]+"   ";
                           }
                           str += "</label></li>";
                        }
                    }
                    str += "</ul></p><div vertical-align = 'bottom'><input type='button' id='addallchecked' value='Відмітити все'><input type='button' id='deleteallchecked' value='Зняти відмітки'><input type='button' id='confirmrefdov' value='Зберегти'><input type='button' id='exitpidr' value='Вийти'></div></form>";
                    $('#modal_form').append(str);
                    var winH = $(window).height();
                    var winW = $(window).width();
                    $('#modal_form').css('height', ($(window).height()-50));
                    $('ul').css('height', ($(window).height()-50)-50);
                    $('#modal_form').css('width',600);
                    $('#modal_form').css('top', winH/2-($(window).height()-50)/2);
                    $('#modal_form').css('left', winW/2-$('#modal_form').width()/2);
                    event.preventDefault(); // выключaем стaндaртную рoль элементa
                    $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
                        function(){ // пoсле выпoлнения предъидущей aнимaции
                            $('#modal_form') 
                                .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                                .animate({opacity: 1, top:  winH/2-($(window).height()-50)/2}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
                    });
                }
            });
        }
    });
    
    $(document).on("click", "#exitpidr", function(){
        $('#modal_close').click();
    })
    
    $(document).on("click", "#addallchecked", function(){
        $("input[name=chk]").prop('checked', true);
    })
    
    $(document).on("click", "#deleteallchecked", function(){
        $("input[name=chk]").prop('checked', false);
    })

    $(document).on("click", "#confirmrefdov", function(){
        var chklist = [];
        $('input[name=chk]:checked').each(function(){ 
           chklist.push($(this).val());
        });
console.log(chklist);        
    })
    
 
	$('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
		$(".tableboxupdate[value=-1]").attr("checked", "checked");
/*      $('#modal_form').append(str);
        $('#modal_form').css('height', 350);
        $('#modal_form').css('width',400);
        var winH = $(window).height();
        var winW = $(window).width();
        $('#modal_form').css('top', winH/2-$('#modal_form').height()/2);
        $('#modal_form').css('left', winW/2-$('#modal_form').width()/2);
        event.preventDefault(); // выключaем стaндaртную рoль элементa
		$('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function(){ // пoсле выпoлнения предъидущей aнимaции
				$('#modal_form') 
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});*/
    });
    
    
})