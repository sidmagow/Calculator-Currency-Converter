/**
 * Created by Sidhant Magow on 04-07-2017.
 */








$().ready(function () {
    var operand="";
    var prevOperand="";
    var intermediateOperaand="";
    var operand1="";
    var operand2="";
    var operator="";
    var check=false;
    var precedenceObj={"+":2,"-":2,"*":1,"/":1};
    var pre1="";
    var  pre2="";
    var intermediateAns;
    var finalAns;
    var regEx=/[0-9]/g;
    var regEx2=/[\*\/\+\-]/g;
    var pre11="";
    var pre22="";
    var checkVar="";
    var itemClicked=[];


    document.addEventListener("keydown",function (event) {
        var code=returnPressed(event);
        console.log("code is"+ code);
        var MCode="";
        if(event.shiftKey&&(code==56||code==187)){
            switch (code){
                case 56:{
                    MCode='*';break;
                }
                case 187:{
                    MCode='+';break;
                }
                default:{
                    console.log("wrong code");
                }
            }
            if(checkVar==""){
                configure(event,MCode);
            }
            else{
                operator="";
                prevOperand=finalAns;
                itemClicked=[];
                itemClicked.push(prevOperand);
                configure(event,MCode);
                checkVar="";}
            document.getElementById('query').innerHTML=prevOperand;
        }
        else if(code==191||code==189){
            switch (code){
                case 191:{
                    MCode='/';break;
                }
                case 189:{
                    MCode='-';break;
                }
                default:{
                    console.log("wrong code");
                }
            }
            if(checkVar==""){
                configure(event,MCode);
            }
            else{
                operator="";
                prevOperand=finalAns;
                itemClicked=[];
                itemClicked.push(prevOperand);
                configure(event,MCode);
                checkVar="";}
            document.getElementById('query').innerHTML=prevOperand;
        }
        else if(code>=48&&code<=57){
            MCode=code-48+"";
            if(checkVar==""){
                configure(event, MCode);
                if(operator==""){
                    finalAns=prevOperand*1;
                }else {
                    precedence1();
                    precedence2();
                }

            }
            else {

                allClear();
                configure(event,MCode);
                checkVar="";
            }

            if(finalAns!==undefined){ document.getElementById("result").innerHTML=finalAns;
            returnFinalans(finalAns)
            updateResult();
            }
            document.getElementById('query').innerHTML=prevOperand;
        }

        else if(code==13){
           if(finalAns!==undefined&&finalAns!=Infinity&&finalAns!=0){ document.getElementById("query").innerHTML=finalAns;}
            document.getElementById("result").innerHTML="";
            checkVar="yes";
        }
        else if(code==190){
            MCode='.';
            configure(event,MCode);
            document.getElementById('query').innerHTML=prevOperand;
        }
        else if(code==8){
            if(itemClicked.length==1){
                allClear();

            }


     if(checkVar=="") {

         var count2 = itemClicked.pop();
         var count3 = itemClicked[itemClicked.length - 1];
         console.log(itemClicked);


         if (count2 == '-') {
             if (count3 == "*" || count3 == "/") {
             }
             else {
                 operator = operator.slice(0, operator.length - 1);
             }
         }
         else if (count2 == '*' || count2 == "/" || count2 == "+") {
             operator = operator.slice(0, operator.length - 1);
         }
         else {
         }
         prevOperand = prevOperand.slice(0, prevOperand.length - 1);
         pre1 = "";
         pre2 = "";
         segregate();
         if (operator == "") {
             finalAns = prevOperand * 1;
         }
         else if (prevOperand[prevOperand.length - 1] == '/' || prevOperand[prevOperand.length - 1] == '*' || prevOperand[prevOperand.length - 1] == '-' || prevOperand[prevOperand.length - 1] == '+') {
         }
         else {
             precedence1();
             precedence2();
         }
     }
     else{

         allClear();
         checkVar="";
     }



            document.getElementById('query').innerHTML=prevOperand;
            if(finalAns=="Infinity"||finalAns==undefined||itemClicked.length==1||isNaN(finalAns)==true){
                operand="";
                finalAns ="";
                returnFinalans(finalAns);
                updateResult();
                document.getElementById("result").innerHTML="";
                return;
            }
            returnFinalans(finalAns);
            updateResult();
            document.getElementById("result").innerHTML=finalAns;
        }
        else if(code==46){
            allClear();
            document.getElementById("query").innerHTML="";
            returnFinalans(finalAns)
            updateResult();
            document.getElementById("result").innerHTML=finalAns;
        }
        else{
            console.log("wrong wrong");
        }
    })


    $('.buttons').on('mouseenter',function (event) {
        event.currentTarget.style.backgroundColor="#5b5b5b";
        event.currentTarget.style.borderRadius="20px";
    })
    $('.buttons').on('mouseleave',function (event) {
        event.currentTarget.style.backgroundColor="#434343";
    })

    $('.op').on('mouseenter',function (event) {
        event.currentTarget.style.backgroundColor="#969494";
        event.currentTarget.style.borderRadius="20px";
    })
    $('.op').on('mouseleave',function (event) {
        event.currentTarget.style.backgroundColor="#636363";
    })



    $('.buttons').on('click',function (event) {
      var lastElement=returnClicked(event);
           console.log(finalAns);
            if(checkVar==""){
                configure(event, null);
                if(operator==""){
                    finalAns=prevOperand*1;
                }else {
                    precedence1();
                    precedence2();
                }
            }
        else {

                allClear();
                configure(event,null);
                checkVar="";
            }
        if(finalAns!==undefined&&finalAns!=Infinity&&isNaN(finalAns)==false){
                returnFinalans(finalAns)
            updateResult();
                document.getElementById("result").innerHTML=finalAns;}
        document.getElementById('query').innerHTML=prevOperand;
    });

    $('.op').on('click',function (event) {
        if(checkVar==""){
            configure(event,null);
        }
        else{
            operator="";
            prevOperand=finalAns;
            itemClicked=[];
            itemClicked.push(prevOperand);
            configure(event,null);
            checkVar="";}
        document.getElementById('query').innerHTML=prevOperand;

    });

    $('#equalto').on('click',function () {
        if(finalAns!==undefined&&finalAns!=Infinity&&isNaN(finalAns)==false){document.getElementById("query").innerHTML=finalAns;}
        document.getElementById("result").innerHTML="";
       checkVar="yes";

    });

    $('#del').on('click',function (event) {

        if(itemClicked.length==1){
            allClear();

        }

    if(checkVar=="") {


        var count2 = itemClicked.pop();
        var count3 = itemClicked[itemClicked.length - 1];
        console.log(itemClicked);


        if (count2 == '-') {
            if (count3 == "*" || count3 == "/") {
            }
            else {
                operator = operator.slice(0, operator.length - 1);
            }
        }
        else if (count2 == '*' || count2 == "/" || count2 == "+") {
            operator = operator.slice(0, operator.length - 1);
        }
        else {
        }
        prevOperand = prevOperand.slice(0, prevOperand.length - 1);
        pre1 = "";
        pre2 = "";
        segregate();
        if (operator == "") {
            finalAns = prevOperand * 1;
        }
        else if (prevOperand[prevOperand.length - 1] == '/' || prevOperand[prevOperand.length - 1] == '*' || prevOperand[prevOperand.length - 1] == '-' || prevOperand[prevOperand.length - 1] == '+') {
        }
        else {
            precedence1();
            precedence2();
        }

    }

    else{

            allClear();
            checkVar="";
        }


        document.getElementById('query').innerHTML=prevOperand;
        if(finalAns=="Infinity"||finalAns==undefined||itemClicked.length==1||isNaN(finalAns)==true){
           operand="";
           finalAns ="";
          returnFinalans(finalAns);
          updateResult();
           document.getElementById("result").innerHTML="";
           return;
       }
        returnFinalans(finalAns);
        updateResult();
        document.getElementById("result").innerHTML=finalAns;


    })

    $('#AC').on('click',function (event) {
        allClear();
        document.getElementById("query").innerHTML="";
        returnFinalans(finalAns);
        updateResult();
        document.getElementById("result").innerHTML=finalAns;
    });

    function returnPressed(y) {
        return y.keyCode||y.which;
    }
    function returnClicked(y){
        return y.currentTarget.id;
    }

    function allClear() {
      prevOperand="";
      operand="";
      operator="";
      pre1="";
      pre2="";
      itemClicked=[];
      finalAns="";
      intermediateAns=0;
    }
    function segregate() {

        operand=prevOperand;
        for(var e=0;e<operator.length;e++){
            if(operator.charAt(e)=='*'||operator.charAt(e)=='/'){
                pre1+=operator.charAt(e);

            }
            else{
                pre2+=operator.charAt(e);
            }
        }
    }

    function configure(x,wh) {
     pre1="";
     pre2="";

     prevOperand=prevOperand+"";
     var count=prevOperand.charAt(prevOperand.length-1);
       var y="";
      /* var abs=x.currentTarget.id;
       var code=x.keyCode||x.which;
       if(wh==1){
           if(code>=48&&code<=57)   { y=code-48;}
          else if(code==43){y='+'}
          else if(code==42){y='*'}
          else if(code==45){y='-'}
          else if(code==47){y='/'}
           else{y=""};
       }else{
           y=abs;
       }
*/

      if(wh==null){
          y=x.currentTarget.id+"";
      }else{
          y=wh+"";
      }


       if(y=='+'){

           if(prevOperand==""){}
           else if(count==y){}
           else if(count=='*'||count=="/"||count=="*") {
               itemClicked.pop();
               operator= operator.slice(0,operator.length-1)+y;
               prevOperand=prevOperand.slice(0,prevOperand.length-1)+y;
               itemClicked.push(y);

           }
           else if(count=="-"){
               if(prevOperand.charAt(prevOperand.length-2)=="*"||prevOperand.charAt(prevOperand.length-2)=="/"){
                   itemClicked.pop();
                   itemClicked.pop();
                   operator= operator.slice(0,operator.length-2)+y;
                   prevOperand=prevOperand.slice(0,prevOperand.length-2)+y;
                   itemClicked.push(y);
               }else{
                   itemClicked.pop();
                   operator= operator.slice(0,operator.length-1)+y;
                   prevOperand=prevOperand.slice(0,prevOperand.length-1)+y;
                   itemClicked.push(y);
               }
           }
           else{

               operator += y;
               operand += y;
               prevOperand+=y;
                itemClicked.push(y);
           }


        }
       else if(y=='-'){

           if(count==y){}

           else if(prevOperand==""||count=="*"||count=="/"){
               operand += y;
               prevOperand+=y;
               itemClicked.push(y);
           }
           else if(count=="-"||count=="+") {
               itemClicked.pop();
               operator= operator.slice(0,operator.length-1)+y;
               prevOperand=prevOperand.slice(0,prevOperand.length-1)+y;
               itemClicked.push(y);
           }

           else{

               operator += y;
               operand += y;
               prevOperand+=y;
                itemClicked.push(y);
           }
       }
        else if(y=='*'||y=='/'){

           if(prevOperand==""){}
           else if(count=='*'||count=="/"||count=="+"){
               itemClicked.pop();


                operator= operator.slice(0,operator.length-1)+y;
                prevOperand=prevOperand.slice(0,prevOperand.length-1)+y;
                itemClicked.push(y);
            }
           else if(count=="-"){
               if(prevOperand.charAt(prevOperand.length-2)=="*"||prevOperand.charAt(prevOperand.length-2)=="/"){
                   itemClicked.pop();
                   itemClicked.pop();
                   operator= operator.slice(0,operator.length-2)+y;
                   prevOperand=prevOperand.slice(0,prevOperand.length-2)+y;
                   itemClicked.push(y);
               }else{
                   itemClicked.pop();
                   operator= operator.slice(0,operator.length-1)+y;
                   prevOperand=prevOperand.slice(0,prevOperand.length-1)+y;
                   itemClicked.push(y);
               }
           }
            else{

                operator+=y;
                operand+=y;
                prevOperand+=y;
                itemClicked.push(y);
            }
        }
        else if(y=='.'){
           if(count=='.') {
               prevOperand = prevOperand.slice(0, prevOperand.length - 1) + y;
           }else{
               prevOperand+=y;
               itemClicked.push(y);
           }
       }
        else{
            operand+=y;
            prevOperand+=y;
            itemClicked.push(y);
        }


        segregate();
        console.log("operand: "+operand);
        console.log("prevoperand: "+ prevOperand);
        console.log("operator: "+operator);
        console.log("pre1: "+pre1);
        console.log("pre11: "+pre11);
        console.log("pre2: "+pre2);
        console.log("pre22: "+pre22);
        console.log("\n")


    }
//
    function precedence1() {
        for(var i=0;i<pre1.length;i++){
            var x=pre1.slice(i,i+1);
            console.log(x);
            var pos=operand.indexOf(x);
            var j;
            if(operand.charAt(pos+1)=='-'){
                j=pos+2;
            }
            else{
                j=pos+1;
            }
            for(;j<operand.length;j++){
                var op=operand.charAt(j);
                if(j==operand.length-1){
                    operand2=operand.slice(pos+1,j+1);
                    var b=j+1;
                    break;
                }

                else if(op=='+'||op=='*'||op=='/'||op=='-'){
                    operand2=operand.slice(pos+1,j);
                     b=j;
                       break;
                }
                else{}
            }
            for(var k=pos-1;k>=0;k--){
                var op1=operand.charAt(k);

                if(k==0){
                    operand1=operand.slice(k,pos);
                    var a=k;
                    break;
                }
                else if(op1=='+'||op1=='-'||op1=='*'||op1=='/'){
                    operand1=operand.slice(k+1,pos);
                     a=k+1;
                     break;

                }else{}

            }
            console.log('operand: '+operand)
            console.log('prevoperand: '+prevOperand);
            console.log('operand1: '+operand1);
            console.log('operand2: '+operand2);

            operand1=operand1*1;
            operand2=operand2*1;
             switch (x){
                 case '*':
                     intermediateAns=operand1*operand2;
                     break;
                 case '/':
                     intermediateAns=operand1/operand2;
                     break;
                 default:
                     console.log("wrong choice");
             }


             for(var l=a;l<b;l++){
                 intermediateOperaand+=operand.charAt(l);
             }
            operand=operand.replace(intermediateOperaand,intermediateAns);
            intermediateOperaand="";
            a=0;b=0;

        }
        pre1="";
    }
    function precedence2() {
        for(var i=0;i<pre2.length;i++){
            var x=pre2.slice(i,i+1);
            console.log(x);
            var pos=operand.indexOf(x);
            if(pos==0){
               pos= operand.indexOf(x, operand.indexOf(x) + 1);
            }
            for(var j=pos+1;j<operand.length;j++){
                var op=operand.charAt(j);
                if(j==operand.length-1){
                    operand2=operand.slice(pos+1,j+1);
                    var b=j+1;
                    break;
                }
                else if(op=='+'||op=='-'||op=='*'||op=='/'){
                    operand2=operand.slice(pos+1,j);
                    b=j;
                    break;
                }
                else{}
            }

            for(var k=pos-1;k>=0;k--){
                var op1=operand.charAt(k);

                if(k==0){
                    operand1=operand.slice(k,pos);
                    var a=k;
                    break;
                }
                 else if(op1=='+'||op1=='-'||op1=='*'||op1=='/'){

                    operand1=operand.slice(k+1,pos);
                    a=k+1;
                    break;
                }
                else{}
            }

            console.log('operand: '+operand);
            console.log("prevoperand: "+prevOperand);
            console.log('operand1: '+operand1);
            console.log('operand2: '+operand2);

            operand1=operand1*1;
            operand2=operand2*1;
            switch (x){
                case '+':
                    intermediateAns=operand1+operand2;
                    break;
                case '-':
                    intermediateAns=operand1-operand2;
                    break;
                default:
                    console.log("wrong choice");
            }


            for(var l=a;l<b;l++){
                intermediateOperaand+=operand.charAt(l);
            }
            operand=operand.replace(intermediateOperaand,intermediateAns);
            intermediateOperaand="";
            a=0;b=0;

        }
        pre2="";
        finalAns=intermediateAns;

        console.log('finalans: '+finalAns);
    }

})