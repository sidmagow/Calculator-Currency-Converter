/**
 * Created by Sidhant Magow on 12-07-2017.
 */

var initialCountry="";
var finalCountry="";
var availableCurrencies=[];
var currentRates=[];
var currenciesString="";
var  finalcurrenciesString="";
function returnFinalans(x){
    $('#selectedCurrency').val(x);
}

function updateResult(){
    console.log("called");
    var finalCountry=$("#finalCurrency").find(":selected").val();
    for(var i in currentRates){
        if(finalCountry==i){
            $('#convertedCurrency').text($('#selectedCurrency').val()*currentRates[i]);
            $('#conversionRate').text("1 "+$("#selectcurrency").find(":selected").val()+" = "+currentRates[i]+" "+$("#finalCurrency").find(":selected").val())




        }
    }
}

function ajaxCall() {

    $.ajax({
        url: "http://api.fixer.io/latest?base=" + $("#selectcurrency").find(":selected").val(),
        type: "GET",
        cache: false,
        dataType: "json",
        statusCode: {
            404: function () {
                console.log("page not found");
            }
        },
        error: function () {
            console.log("error")
        },
        success: function (response, status, jqXHR) {
            currentRates = response.rates;
            currentRates[$("#selectcurrency").find(":selected").val()]=1;
            console.log(currentRates);
            console.log(status);
            console.log(jqXHR);

        },
        complete: function () {
            updateResult();
        }
    })
}



$().ready(function (event) {


    $('#slide').on('click',function () {
        if($(this).text()=="<") {
            $("#from").fadeOut("fast");
            $("#fromText").fadeOut("fast");
            $("#selectedCurrency").fadeOut("fast");
            $("#to").fadeOut("fast");
            $("#finalCurrency").fadeOut("fast");
            $("#toText").fadeOut("fast");
            $("#convertedCurrency").fadeOut("fast");
            $("#Rate").fadeOut("fast");
            $("#conversionRate").fadeOut("fast");

            document.getElementById('currencyConv').setAttribute("style", "width:0px");
            $(this).text(">");
        }else{

            $("#from").fadeIn(4500);
            $("#fromText").fadeIn(4500);
            $("#selectedCurrency").fadeIn(4500);
            $("#to").fadeIn(4500);
            $("#finalCurrency").fadeIn(4500);
            $("#toText").fadeIn(4500);
            $("#convertedCurrency").fadeIn(4500);
            $("#Rate").fadeIn(4500);
            $("#conversionRate").fadeIn(4500);

            document.getElementById('currencyConv').setAttribute("style", "width:250px");
            $(this).text("<");

        }

    })

    $.ajax({
        url:"http://api.fixer.io/latest?base=INR",
        type:"GET",
        cache:false,
        dataType:"json",
        statusCode:{
            404: function () {
                console.log("page not found");
            }
        },
        error:function () {
            console.log("error")
        },
        success:function (response,status,jqXHR) {
            console.log(response.rates);
            availableCurrencies=Object.keys(response.rates);
            console.log(availableCurrencies);
            currentRates=response.rates;
            console.log(status);
            console.log(jqXHR);
        },
        complete:function () {
            console.log("request complete");
            availableCurrencies.push("INR")
            for(var j in availableCurrencies){
                currenciesString+="<option value="+"'"+availableCurrencies[j]+"'"+">"+availableCurrencies[j]+"</option>";
            }
            $("#selectcurrency").html(currenciesString);
            $("#finalCurrency").html(currenciesString);
            $("#fromText").text($("#selectcurrency").find(":selected").val());
            $("#toText").text($("#finalCurrency").find(":selected").val());
            ajaxCall();

        }

    })


    $("#selectcurrency").on('change',function (event) {
         $("#fromText").text($("#selectcurrency").find(":selected").val());
         ajaxCall();

    })


    $("#finalCurrency").on('change',function (event) {
         $("#toText").text($("#finalCurrency").find(":selected").val());
         updateResult();

    })

})