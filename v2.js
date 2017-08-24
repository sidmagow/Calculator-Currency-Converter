/**
 * Created by Sidhant Magow on 17-07-2017.
 */
$().ready(function () {
    var operand;
    var ans;

    $('.buttons').on('click',function (x){
        document.getElementById('query').innerHTML+=x.currentTarget.id;
    operand+=x.currentTarget.id;
    operand=operand*1;
    ans=operand;
    $('#result').text(ans);

    })

    $('.op').on('click',function (event) {
        document.getElementById('query').innerHTML+=event.currentTarget.id;
        operand+=event.currentTarget.id;
    })
})