'use strict';
// сделала скролл к блоку товаров
document.getElementById('choise-items').addEventListener('click', function() {
   let targetBlock = document.getElementById('cakes-choise');
   targetBlock.scrollIntoView({ behavior: 'smooth' });
 });
//  по зходу на страницу мы прячем блок
 $('.thanks-for-order').hide();

//  в блоке товаров можно при клике на кнопку сформировать заказ увидеть цену за общее колво пирожных каждого вида
let butttonBuy = $('.button-buy');
let macaroonOrder = {};
let choiceInput = $('#product-name');
let customName = $('#custom-name');
let customPhone = $('#custom-phone');
let orderCompleteBtn = $('#order-complete');
let url = 'https://testologia.ru/checkout';
let unitPrice = parseFloat($('.price-unit').text().replace(',', '.'));
// в инпуте Ваш выбор будет виден объект заказа не самое хорошеее решение , но дизайн менять и добавлять свои инпуты я не решилась

butttonBuy.each(function(){
   let count = 1;
   $(this).on('click', function(){
     
      let title = $(this).closest('.choice-item').find('.choice-item__title').text().trim();
      let amount = $(this).closest('.choice-item').find('.amount');
      let price = $(this).closest('.choice-item').find('.price-unit');
      amount.html(count + ' шт')
         macaroonOrder[title] = count + ' шт';
         choiceInput.val(JSON.stringify(macaroonOrder));
let totalSum = unitPrice * count;
price.html(totalSum.toFixed(2).replace('.',',') + ' руб')
count++; 

   })

} )

let loader = $('.loader-block');

orderCompleteBtn.on('click', function(e){

e.preventDefault();
let regEx = /^\+375\(\d{2}\)\d{7}$/;
let isValidInput = true;
if(!choiceInput.val()){
   choiceInput.next().show();
   choiceInput.addClass('invalid')
   isValidInput = false;

} else {
   choiceInput.next().hide();
   choiceInput.removeClass('invalid');
}
if(!customName.val()){
   customName.next().show();
   customName.addClass('invalid')
   isValidInput = false;

}else {
   customName.next().hide();
   customName.removeClass('invalid');
}
if(!customPhone.val() || !regEx.test(customPhone.val())){
   customPhone.next().show();
   customPhone.addClass('invalid')
   isValidInput = false;

}else {
   customPhone.next().hide();
   customPhone.removeClass('invalid');
}

if(isValidInput){
   loader.css('display', 'flex')
   $.ajax({
      url: url,
      method: 'post',
          data: {product:choiceInput.val(),
         name: customName.val(),
         phone: customPhone.val()
       }
   
      }).done(function(message){
         loader.hide()
         if(message.success === 1){
            $('.order-item ').hide();
            $('.thanks-for-order').fadeIn(1500);
         }else {
            alert ("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
         }
      })
   }
   })

