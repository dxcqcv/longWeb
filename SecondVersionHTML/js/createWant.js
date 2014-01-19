// for want page date select
var wantDatePoint = {
    'startX': '0',
    'endX': '0',
    'moveEnable': false,
    'startButton': false,
    'endButton': false
},
    wantDatePos = {
    'sX': '',
    'eX': ''
    },
    wantDatePointStart = $('.wantDatePointStart'),
    wantDatePointEnd = $('.wantDatePointEnd'),
    wantDateStartTips = $('.wantDateStartTips'),
    wantDateEndTips = $('.wantDateEndTips'),
    wantDateStartShow = $('.wantDateStartShow'),
    wantDateEndShow = $('.wantDateEndShow'),
    wantToday = $('.wantToday'),
    wantTodayPoint = $('.wantTodayPoint'),
    wantTime, wantUNIX_timestamp,
    md_,

    itemStartTime = $('input[name=item-start_time]'),
    itemDuration = $('input[name=item-duration]'),
    ist = '', // item start time   
    ids = 0, // item duration start
    ide = 7, // item duration end
    idr; // item duration result

    wantTime = new Date();
    wantUNIX_timestamp = parseInt(wantTime.getTime()/1000);
    var start_date_offset = 0;
    var end_data_offset = 7;

function wantDateConverter(UNIX_timestamp, timeOffset) {
    var wantDate = new Date(UNIX_timestamp*1000), dateValue, newWantDate, wantDateMonth, wantDateDay;

    dateValue = wantDate.valueOf();
    dateValue += timeOffset*60*60*1000;

    newWantDate = new Date(dateValue);

    wantDateMonth = newWantDate.getMonth()+1;
    wantDateDay = newWantDate.getDate();
    wantDateYear = newWantDate.getFullYear();

    return [wantDateMonth, wantDateDay, wantDateYear];
}

var md_ = new Array();
for (var i=0; i<=31; i++) {
    md_[i] = wantDateConverter(wantUNIX_timestamp, i*24);
}

wantDateEndShow.text('+7 days(' + md_[7][0] + '/' + md_[7][1] + ')');

wantDatePointStart.on('mousedown', function(e){
    wantDatePoint.startX = parseInt($(this).css('left'));
    wantDatePoint.moveEnable = true;
    wantDatePoint.startButton = true;
    wantDatePoint.endButton = false;
    wantDatePos.sX = e.pageX;
    return false;
});
wantDatePointEnd.on('mousedown', function(e){
    wantDatePoint.startX = parseInt($(this).css('left'));
    wantDatePoint.moveEnable = true;
    wantDatePoint.startButton = false;
    wantDatePoint.endButton = true;
    wantDatePos.sX = e.pageX;
    return false;
});
$('.wantMode').on('mouseup', function(){
    wantDatePoint.moveEnable = false;
    return false;
});
$('.wantMode').on('mousemove', function(e){
    if(wantDatePoint.moveEnable){
        wantDateMove(e);
    }
    return false;
});
function wantDateMove(e) {
    if(wantDatePoint.moveEnable) {
       var dx, currentX, currentWidthStart, currentWidthEnd, wantDateStartPos, wantDateEndPos, sc, tc,
         wantDateBarInnerStart = $('.wantDateBarInnerStart'),
         wantDateBarInnerEnd = $('.wantDateBarInnerEnd');

         wantDatePos.eX = e.pageX;
         dx = wantDatePos.eX - wantDatePos.sX;
         currentX = wantDatePoint.startX + dx;
         currentX = currentX < 0 ? 0 : currentX;
         currentX = currentX > 731 ? 731 : currentX;
         currentWidthStart = parseInt(wantDateBarInnerStart.width()) + dx;
         currentWidthStart = currentWidthStart < 0 ? 0 : currentWidthStart;
         currentWidthStart = currentWidthStart > 731 ? 731 : currentWidthStart;
         currentWidthEnd = parseInt(wantDateBarInnerEnd.width()) + dx;
         currentWidthEnd = currentWidthEnd < 0 ? 0 : currentWidthEnd;
         currentWidthEnd = currentWidthEnd > 731 ? 731 : currentWidthEnd;
         wantDateStartPos = parseInt(wantDatePointStart.css('left'));
         wantDateEndPos = parseInt(wantDatePointEnd.css('left'));
         
         if(wantDatePoint.startButton) {
            wantDateStartTips.css('left', currentX-40 + 'px'); 
            wantDatePointStart.css('left', currentX + 'px');
            wantDateBarInnerStart.css('width', currentX+7 + 'px');
            wantDateStartShow.css('left', currentX-40 + 'px');
            sc = parseInt(wantDatePointStart.css('left'));
            console.log('start sc is ' + sc);
            tc = parseInt(wantDateStartTips.css('left'));
            if(tc > -17) {
                wantToday.show('slow');
                wantTodayPoint.show('slow');
            }

            var i_day = parseInt(sc/23);
            console.log('start i_day is ' + i_day);
            start_date_offset = i_day;
            if (i_day == 0) {
                var ist = '';
                var day_string = 'Today';
                wantToday.hide();
                wantTodayPoint.hide();
                wantDateStartShow.css('left', currentX-30 + 'px');
            }
            else {
                ist = md_[i_day][0] + '/' + md_[i_day][1] + '/' + md_[i_day][2];
                var day_string = '+' + i_day.toString() + ' day';
                if (i_day > 1) day_string += 's';
                day_string += ' ';
            }
            wantDateStartShow.text('(' + day_string + md_[i_day][0] + '/' + md_[i_day][1] + ')');
            itemStartTime.val(ist);
            idr = end_date_offset - start_date_offset;
            itemDuration.val(idr);

            if(wantDateStartPos == wantDateEndPos || wantDateStartPos > wantDateEndPos) {
                wantDatePoint.startButton = false;
                wantDateStartShow.text('Today');
                wantToday.hide();
                wantTodayPoint.hide();
                wantDateStartTips.css('left', (0-40) + 'px'); 
                wantDatePointStart.css('left', 0 + 'px');
                wantDateBarInnerStart.css('width', 0 + 'px');
                wantDateStartShow.css('left', 0-10 + 'px');
                alert('the start point and the end point never be the same !!!');
            }
         }
         if(wantDatePoint.endButton) {
            wantDateEndTips.css('left', currentX-40 + 'px'); 
            wantDatePointEnd.css('left', currentX + 'px');
            wantDateBarInnerEnd.css('width', currentX+7 + 'px');
            wantDateEndShow.css('left', currentX-40 + 'px');
            sc = parseInt(wantDatePointEnd.css('left'));

            var i_day = parseInt(sc/23);
            end_date_offset = i_day;
            if (i_day == 0) {
                var day_string = 'Today';
                wantToday.hide();
                wantTodayPoint.hide();
                wantDateEndShow.css('left', currentX-30 + 'px');
            }
            else {
                var day_string = '+' + i_day.toString() + ' day';
                if (i_day > 1) day_string += 's';
                day_string += ' ';
            }
            wantDateEndShow.text('(' + day_string + md_[i_day][0] + '/' + md_[i_day][1] + ')');
            idr = end_date_offset - start_date_offset;
            itemDuration.val(idr);

            if(wantDateStartPos == wantDateEndPos || wantDateEndPos < wantDateStartPos) {
                wantDatePoint.endButton = false;
                wantDateEndShow.text('31 days');
                wantDateEndTips.css('left', 691 + 'px'); 
                wantDatePointEnd.css('left', 731 + 'px');
                wantDateBarInnerEnd.css('width', 731 + 'px');
                wantDateEndShow.css('left', 711 + 'px');
                alert('the start point and the end point never be the same !!!');
            }
         }

    }
}
