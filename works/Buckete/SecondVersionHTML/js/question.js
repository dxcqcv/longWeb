(function() {
    var questionGB = $('.questionGB'),
        questionDelivery = $('.questionDelivery'),
        questionDeposit = $('.questionDeposit'),
        questionTabTitle = $('.questionTabTitle'),
        questionGBContent = $('.questionGBContent'),
        questionDeliveryContent = $('.questionDeliveryContent'),
        questionDepositContent = $('.questionDepositContent');

    questionClick('questionGB', questionGBContent, questionGB);
    questionClick('questionDelivery', questionDeliveryContent, questionDelivery);
    questionClick('questionDeposit', questionDepositContent,questionDeposit );

    function questionClick(clickName, showName, objName) {
        objName.on('click', function(){
           showName.show().siblings().hide(); 
           switch(clickName) {
            case 'questionGB':
               questionGB.find('span.qgbIcon').addClass('qgbIcon01');
               questionDelivery.find('span.qDeliveryIcon').removeClass('qDeliveryIcon01');
               questionDeposit.find('span.qDepositIcon').removeClass('qDepositIcon01');
               break;
            
            case 'questionDelivery':
               questionGB.find('span.qgbIcon').removeClass('qgbIcon01');
               questionDelivery.find('span.qDeliveryIcon').addClass('qDeliveryIcon01');
               questionDeposit.find('span.qDepositIcon').removeClass('qDepositIcon01');
               break;
            case 'questionDeposit':
               questionGB.find('span.qgbIcon').removeClass('qgbIcon01');
               questionDelivery.find('span.qDeliveryIcon').removeClass('qDeliveryIcon01');
               questionDeposit.find('span.qDepositIcon').addClass('qDepositIcon01');
               break;
           }
           objName.find(questionTabTitle).addClass('questionTabTitleSelected').parent(objName).siblings().find(questionTabTitle).removeClass('questionTabTitleSelected');
        });
    }
})();
