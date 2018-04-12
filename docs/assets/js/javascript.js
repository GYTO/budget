var budgetController=function(){var o=function(e,t,n){this.id=e,this.description=t,this.value=n,this.percentage=-1};o.prototype.calcPercentage=function(e){this.percentage=0<e?Math.round(this.value/e*100):-1},o.prototype.getPercentage=function(){return this.percentage};var e=function(e){var t=0;a.allItems[e].forEach(function(e){t+=e.value}),a.totals[e]=t},a={allItems:{exp:[],inc:[]},totals:{exp:0,inc:0}};return{addItem:function(e,t,n){var i,r;return r=0<a.allItems[e].length?a.allItems[e][a.allItems[e].length-1].id+1:0,"exp"===e?i=new o(r,t,n):"inc"===e&&(i=new function(e,t,n){this.id=e,this.description=t,this.value=n}(r,t,n)),a.allItems[e].push(i),i},deleteItem:function(e,t){var n;-1!==(n=a.allItems[e].map(function(e){return e.id}).indexOf(t))&&a.allItems[e].splice(n,1)},calculationBudget:function(){e("exp"),e("inc"),a.budget=a.totals.inc-a.totals.exp,0<a.totals.inc?a.percentage=Math.round(a.totals.exp/a.totals.inc*100):a.percentage=-1},calculatePercentages:function(){a.allItems.exp.forEach(function(e){e.calcPercentage(a.totals.inc)})},getPercentages:function(){return a.allItems.exp.map(function(e){return e.getPercentage()})},getBudget:function(){return{budget:a.budget,totalInc:a.totals.inc,totalExp:a.totals.exp,percentage:a.percentage}},testing:function(){console.log(a)}}}(),UIController=function(){var o={inputType:".form_input--type",inputDescription:".form_input--description",inputValue:".form_input--value",inputButton:".form_button",incomeContainer:".history__container--income",expensesContainer:".history__container--expenses",budgetLabel:".main_budget",incomeLabel:".badge--income .badge__number",expensesLabel:".badge--expenses .badge__number",percentageLabel:".badge--expenses .badge__percentage",container:".history",expensesPercLabel:".history__item_badge",dateLabel:".main_title__month"},a=function(e,t){var n,i;return 3<(i=(n=(e=(e=Math.abs(e)).toFixed(2)).split("."))[0]).length&&(i=i.substr(0,i.length-3)+","+i.substr(i.length-3,3)),("exp"===t?"-":"+")+" "+i+"."+n[1]},t=function(e,t){for(var n=0;n<e.length;n++)t(e[n],n)};return{getInput:function(){return{type:document.querySelector(o.inputType).value,description:document.querySelector(o.inputDescription).value,value:parseFloat(document.querySelector(o.inputValue).value)}},addListItem:function(e,t){var n,i,r;"inc"===t?(r=o.incomeContainer,n='<div class="history__item" id="inc-%id%"><div class="history__item_title">%description%</div><div class="history__item_amount">%value%</div><div class="history__item_remove"></div></div>'):"exp"===t&&(r=o.expensesContainer,n='<div class="history__item" id="exp-%id%"><div class="history__item_title">%description%</div><div class="history__item_amount">%value%<span class="history__item_badge">20%</span></div><div class="history__item_remove"></div></div>'),i=(i=(i=n.replace("%id%",e.id)).replace("%description%",e.description)).replace("%value%",a(e.value,t)),document.querySelector(r).insertAdjacentHTML("beforeend",i)},deleteListItem:function(e){var t=document.getElementById(e);t.parentNode.removeChild(t)},clearFields:function(){var e,t;e=document.querySelectorAll(o.inputDescription+","+o.inputValue),(t=Array.prototype.slice.call(e)).forEach(function(e,t,n){e.value=""}),t[0].focus()},displayBudget:function(e){var t;t=0<e.budget?"inc":"exp",document.querySelector(o.budgetLabel).textContent=a(e.budget,t),document.querySelector(o.incomeLabel).textContent=a(e.totalInc,"inc"),document.querySelector(o.expensesLabel).textContent=a(e.totalExp,"exp"),0<e.percentage?document.querySelector(o.percentageLabel).textContent=e.percentage+"%":document.querySelector(o.percentageLabel).textContent="---"},displayPercentages:function(n){var e=document.querySelectorAll(o.expensesPercLabel);t(e,function(e,t){0<n[t]?e.textContent=n[t]+"%":e.textContent="---"})},displayMonth:function(){var e,t,n,i;t=(e=new Date).getMonth(),n=["January","February","March","April","May","June","July","August","September","October","November","December"],i=e.getFullYear(),document.querySelector(o.dateLabel).textContent=" "+n[t]+" "+i},changedType:function(){var e=document.querySelectorAll(o.inputType+","+o.inputDescription+","+o.inputValue);t(e,function(e){e.classList.toggle("exp")}),document.querySelector(o.inputButton).classList.toggle("exp")},getDOMstrings:function(){return o}}}(),controller=function(o,a){var c=function(){o.calculationBudget();var e=o.getBudget();a.displayBudget(e)},l=function(){o.calculatePercentages();var e=o.getPercentages();a.displayPercentages(e),console.log(e)},t=function(){var e,t;""!==(e=a.getInput()).description&&!isNaN(e.value)&&0<e.value&&(t=o.addItem(e.type,e.description,e.value),a.addListItem(t,e.type),a.clearFields(),c(),l())},n=function(e){var t,n,i,r;(t=e.target.parentNode.id)&&(i=(n=t.split("-"))[0],r=parseInt(n[1]),o.deleteItem(i,r),a.deleteListItem(t),c(),l())};return{init:function(){var e;console.log("App is running"),a.displayMonth(),a.displayBudget({budget:0,totalInc:0,totalExp:0,percentage:-1}),e=a.getDOMstrings(),document.querySelector(e.inputButton).addEventListener("click",t),document.addEventListener("keypress",function(e){13!==e.keyCode&&13!==e.which||t()}),document.querySelector(e.container).addEventListener("click",n),document.querySelector(e.inputType).addEventListener("change",a.changedType)}}}(budgetController,UIController);controller.init();