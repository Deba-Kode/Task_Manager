let all_data = [];
function displayData(){
    $("#tableData tbody").empty();
        let table_row = "";
        for(let x in all_data){
            table_row += '<tr><td>'+all_data[x].taskData+'</td><td>'+all_data[x].titleData+'</td><td>'+all_data[x].descData+'</td><td>'+all_data[x].priorityData+'</td><td>'+all_data[x].dateData+'</td><td><label for="btn1"></label><button  class="btn btn-danger" onClick="removeFunction('+x+')"><i class="bi bi-dash"></i></button></td><td><label for="btn2"></label><button class="btn btn-success" onClick="editFunction('+x+')"><i class="bi bi-pen me-2">Edit</button></td><td></td></tr>';
        }
        $("#tableData tbody").append(table_row);
}

// ======================================Local Storage for Page Refresh Event ======================================

function displayDataFromStorage() {
    let storedData = JSON.parse(localStorage.getItem('taskData'));
    // alert(JSON.stringify(storedData));
    if (storedData) {
        all_data = storedData;
        displayData();
    }
}

// Function to store data in local storage
function storeData() {
    localStorage.setItem('taskData', JSON.stringify(all_data));
}

// Function to handle page refresh event
function handlePageRefresh() {
    window.addEventListener('beforeunload', function(event) {
        storeData(); // Store data in local storage before the page is unloaded
    });
}

// =========================================Local Storage for Page Refresh Event ======================================

$(function () {
    $("#tableData").sortable({      //used to make the row draggable
        items: 'tr',                //used to make the row draggable
        update: function() {                //======================used to make the dragged row as it si after refresh also==========
            all_data = [];
            $("#tableConent tr").each(function() {
                let tempArray = $(this).find('td').map(function() {
                    return $(this).text();
                    // The map method is then used to iterate over each table cell and extract its text content using $(this).text()
    
                }).get();
                // The get() method is used to convert the jQuery object into a plain array.
                all_data.push({
                    taskData: tempArray[0],
                    titleData: tempArray[1],
                    descData: tempArray[2],
                    priorityData: tempArray[3],
                    dateData: tempArray[4]
                });
            });
            storeData();                //======================used to make the dragged row as it si after refresh also==========
        }
    });
});



$(document).ready(function(){
    $("#date").datepicker({
        minDate:0
    });

    displayDataFromStorage();           //=========Local Storage=========
    $("#btnUpdate").hide();

    $("#btnUpdate").on("click", function(){
        if((check_task() && check_title() && check_description() && check_priority() && check_date()) == true ){
            let cur_arr_id = $(this).attr("data-id");
            let tempArray = {};
            tempArray.taskData = $("#task").val();
            tempArray.titleData = $("#title").val();
            tempArray.descData = $("#description").val();
            tempArray.priorityData = $('input[name="radio"]:checked').val();
            tempArray.dateData = $("#date").val();
            all_data[cur_arr_id] = tempArray;
            storeData();           //=========Local Storage=========
            displayData();
            $("#btnUpdate").hide();
            clear_Value();
            $("#addbtn").show();
            $("#AddUpdate").empty().append("Add");
        }
    })


    let table = new DataTable('#tableData',{"aaSorting":[]}); //Sorting false for sorting in datatable while refreshing the    page when dragging is done
    // let table = $('#tableData').DataTable({
    //     rowReorder: {
    //         selector: 'tr'
    //     }
    // });


    $("#addbtn").on("click",function(){
        if((check_task() && check_title() && check_description() && check_priority() && check_date()) == true ){
            $(".tableInput").each(function(){
                let one_data = {};
                one_data.taskData = $("#task").val();
                one_data.titleData = $("#title").val();
                one_data.descData = $("#description").val();
                one_data.priorityData = $('input[name="radio"]:checked').val();
                one_data.dateData = $("#date").val();
                all_data.push(one_data);
                storeData();           //=========Local Storage=========
                row_numberings();
                clear_Value();
                // alert(JSON.stringify(one_data));
            });
            
            // alert(taskData+" "+titleData+" "+descData+" "+priorityData+" "+dateData);
            // $("#tableData tbody").append("<tr><td>"+taskData+"</td><td>"+titleData+"</td><td>"+descData+"</td><td>"+priorityData+"</td><td>"+dateData+"</td><td><label for='btn1'></label><button class='btn btn-danger'><i class='bi bi-dash'></i></button></td><td><label for='btn2'></label><button id='btn2' class='btn btn-success'><i class='bi bi-pen me-2'>Edit</button></td><td></td></tr>");
            displayData();
        }
    })

    $("#clearBtn").on("click", function(){
        // Modal is being triggered on click
    })

    $("#modelClearAllBtn").on("click", function(){
        all_data = [];
        table.clear().draw();
    })

    function clear_Value(){
        $("#task").val('');
        $("#title").val('');
        $("#description").val('');
        $('input[name="radio"]').prop('checked', false);
        $("#date").val('');
    }

    function row_numberings() {
        let arr_length = all_data.length == 0 ? all_data.length : all_data.length - 1;
        table.row.add([
            all_data[arr_length].taskData,
            all_data[arr_length].titleData,
            all_data[arr_length].descData,
            all_data[arr_length].priorityData,
            all_data[arr_length].dateData,
            '<button  class="btn btn-danger" onClick="removeFunction(' + arr_length + ')"><i class="bi bi-dash"></i></button>',
            '<button class="btn btn-success" onClick="editFunction(' + arr_length + ')"><i class="bi bi-pen me-2">Edit</button>',
            ""
        ]).draw(false);
    }

    var regeX = /[A-Za-z]+$/;

    function check_task(){
        if($("#task").val() == ''){
            alert("Task field is empty");
            return false;
        }
        else if(!regeX.test($("#task").val())){
            alert("Please put only the characters.");
        }
        else{
            // alert("Task field is Full");
            return true;
        }
    }

    function check_title(){
        if($("#title").val() == ''){
            alert("Title field is empty");
            return false;
        }
        else if(!regeX.test($("#title").val())){
            alert("Please put only the characters.");
        }
        else{
            // alert("Title field is Full");
            return true;
        }
    }

    function check_description(){
        if($("#description").val() == ''){
            alert("Description field is empty");
            return false;
        }
        else if(!regeX.test($("#description").val())){
            alert("Please put only the characters.");
        }
        else{
            // alert("Description field is Full");
            return true;
        }
    }

    function check_priority(){
        if($('input[name = "radio"]:checked').val() == null){
            alert("Priority is not selected");
            return false;
        }
        else{
            // alert("Priority Selected");
            return true;
        }
    }

    function check_date(){
        if($("#date").val() == ''){
            alert("Date field not selected");
            return false;
        }
        else{
            // alert("Date field selected");
            return true;
        }
    }

    handlePageRefresh();           //=========Local Storage=========
});

function editFunction(x){
    $("#task").val(all_data[x].taskData);
    $("#title").val(all_data[x].titleData);
    $("#description").val(all_data[x].descData);
    // $("#priority").val(all_data[x].priorityData);
    $('input[name="radio"][value="' + all_data[x].priorityData + '"]').prop("checked", true);
    $("#date").val(all_data[x].dateData);
    $("#addbtn").hide();
    $("#btnUpdate").show();
    $("#AddUpdate").empty().append("Update");
    $("#btnUpdate").attr("data-id", x);
}

function removeFunction(x){
    let array_index_to_delete = x;
    all_data.splice(array_index_to_delete, 1);
    $('#tableData').DataTable().row(x).remove().draw();
    displayData();
}