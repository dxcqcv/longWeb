(function() {
    var questionGB = $('.questionGB'),
        questionDelivery = $('.questionDelivery'),
        questionDeposit = $('.questionDeposit'),
        questionTabTitle = $('.questionTabTitle'),
        questionGBContent = $('.questionGBContent'),
        questionDeliveryContent = $('.questionDeliveryContent'),
        questionDepositContent = $('.questionDepositContent');

    questionClick(questionGB, questionGBContent);
    questionClick(questionDelivery, questionDeliveryContent );
    questionClick(questionDeposit, questionDepositContent );

    function questionClick(clickName, showName) {
        clickName.on('click', function(){
           showName.show().siblings().hide(); 
           clickName.find(questionTabTitle).addClass('questionTabTitleSelected').parent(clickName).siblings().find(questionTabTitle).removeClass('questionTabTitleSelected');
        });
    }
})();
