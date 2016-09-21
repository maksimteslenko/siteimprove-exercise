$(document).ready(function(){
    $('.loader-container').show();

    setTimeout(function() {
         getPersonData();
    }, 3000);
    
    function getPersonData(){
        $.ajax({ 
            type    : "GET",
            url     : "http://assignment.siteimprove.com/api/persons",
            dataType: "json",
            data    : "{}",           
            success : function(data) {
                for (var i = 0; i < data.length; i++) {
                    if(i == 0) {
                        tr = $("<tr class="+" 'row" + [i] + "' data-brains-id=" + data[i].Id +"/>");
                        tr.append("<td>"+ 
                                data[i].Name + 
                            "</td>" + 
                            "<td>" + 
                                data[i].YearOfBirth + 
                            "</td>" + 
                            "<td class=\"children\">" + 
                                data[i].NumChildren + 
                            "</td>" + 
                            "<td class='profession'>" + 
                                data[i].Profession + 
                            "</td>");

                        setTimeout(function(){                        
                            $('#brains').append(tr);
                            $('.loader-container').hide();
                            for (var j = 1;j < data.length; j++) {
                                tr = $("<tr class="+" 'row" + [j] + "' data-brains-id=" + data[j].Id +"/>");
                                 tr.append("<td>" +
                                        data[j].Name +
                                     "</td>" +
                                     "<td>" +
                                        data[j].YearOfBirth +
                                     "</td>" +
                                     "<td class=\"children\">" +
                                        data[j].NumChildren +
                                     "</td>" +
                                     "<td class='profession'>" +
                                        data[j].Profession +
                                     "</td>");
                                 $('#brains').append(tr);
                            }
                        }, 3000);  
                    }                                     
                }
            },
            complete: function(){
            }
        });
    }

    function getChildrenData(id) {
        $.ajax({ 
            type    : "GET",
            url     : "http://assignment.siteimprove.com/api/persondetails/" + id,
            dataType: "json",
            data    : "{}",
            success: function (data) {
                
                for (var i = 0; i < data.length; i++) {
                    tr = $("<tr/>");
                    tr.append("<td>"+ 
                            data[i].Name + 
                        "</td>" + 
                        "<td>" + 
                            data[i].YearOfBirth + 
                        "</td>" + 
                        "<td>" + 
                            data[i].Mother + 
                        "</td");
                        $('#table'+id).append(tr);
                }
            },
            complete: function () {
            }
        });
    }

    var clicks = 0;
    $("#brains").on("click", ".children",function () {
        if(clicks==0){
            var brainsId = $(this).parent().data("brainsId");
            getChildrenData(brainsId);
            var PersonsChildrenTable='<tr class="active">'+
                                    '<td colspan="100%">'+
                                        '<table width="100%" id="table'+ brainsId + '" class="table table-bordered"><thead><tr><th>Name</th><th>Year Of Birth</th><th>Mother</th></tr></thead>'+
                                            '<tbody></tbody' +
                                        '</table>' +
                                    '</td>'+
                                '</tr>';
            $('#brains > tbody > tr:nth-child('+ brainsId +')').after(PersonsChildrenTable);
            clicks++;
        }
        else{
            $('tr.active').remove();
            clicks--;
        }
    });
});