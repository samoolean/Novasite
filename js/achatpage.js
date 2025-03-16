var paymentForm = $('form');

/**
* Focus in form when clicked on label
*/

paymentForm.find('label').on('click tap', function(){
  $(this).siblings('input').focus();
})

/**
 * Flip card an highlight focused field on card
 */
paymentForm.find('input').on('focus', function(){

    //flip to the correct side of the card
    var side = $(this).attr('data-side');
    var card = $('.reference-card');

   (side !== 'back') ? card.removeClass('flipped') : card.addClass('flipped');

   //focus field on the card
   var field = $(this).attr('data-focusable');
   var focusables = card.find('.focusable');
   focusables.removeClass('focused');
   card.find('.' + field + '.focusable').addClass('focused');

})

/**
 * Update info on the card - card number
 */
paymentForm.find('input[name="cardnumber"]').on('keyup', function(){
    var value = $(this).val();
    var cardNumber = $('.reference-card .card-number');
  
      //add filled class if value exists
   if(value.length > 0){
     $(this).addClass('filled');
   }

    //remove previous value
    cardNumber.find('div').remove();

    //split value in groups of four
    for(var i = 0; i<4; i++){
        var part = '<div>{{number}}</div>';
        var number = value.slice(4 * i, (4 * i) + 4);
        part = part.replace('{{number}}', number);
        cardNumber.append(part);
    }

    var icon = $('.card-icon');



    icon.attr('class', 'card-icon fa ' + getCardIcon(value).icon);



})

/**
 * Update info on the card - all others
 */

paymentForm.find('input').not('input[name="cardnumber"]').on('keyup', function(){
    var value = $(this).val();
  
      //add filled class if value exists
   if(value.length > 0){
     $(this).addClass('filled');
   }
  
    var fieldOnCard = $(this).attr('data-focusable');

    $('.focusable.' + fieldOnCard).text(value);
})

function getCardIcon(number){
    var types = [
            {name: "visa", icon:"fa-cc-visa", re: /^4[0-9]{6,}$/},
            {name: "mastercard", icon:"fa-cc-mastercard", re: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/},
            {name: "amex", icon:"fa-cc-amex", re: /^3[47][0-9]{5,}$/},
            {name: "diners", icon:"fa-cc-diners-club", re: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/},
            {name: "discover", icon:"fa-cc-discover", re: /^6(?:011|5[0-9]{2})[0-9]{3,}$/},
            {name: "jcb", icon:"fa-cc-jcb", re: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/}
        ];

    var type = {name: "general", icon:"fa-credit-card"};

    $.each(types, function(i, v){
        if(v.re.test(number)){
            type = v;
            return false;
        }
    })

    return type;
}
