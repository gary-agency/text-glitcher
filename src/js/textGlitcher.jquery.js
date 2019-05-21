
(function ($) {
    $.fn.textGlitcher = function (options) {

        var settings = $.extend({
            frameTime: 110,
            frames: 20,
            probability: 50,
            deglitchTime: 200,
            gChars: ['░','/','▓','▒','█','▄','▀','▌','\\','▐'],
        }, options);

        var chars_ = settings.gChars;
        var charsMax_ = chars_.length - 1;
        var regex_ = new RegExp("[a-zA-Z0-9]");



        const getRandomGlitchItem = function(){
            var i = Math.floor(Math.random() * (charsMax_ + 1)) ;
            return chars_[i];
        };

        const prob = function(n){
            n = n/100;
            return !!n && Math.random() <= n;
        };

        return this.each(function () {
            var text = $(this).text();
            var prob4Str = settings.probability;
            var deglitch = undefined;
            var glitch = undefined;
            var frame = settings.frames;


            const replaceText = function($el, prob__, text, frame){
                var newText = '';
                for (var i = 0; i < text.length; i++) {
                    var charStr = text.charAt(i);
                    if(regex_.test(charStr)){
                        if(prob(prob__)){
                            charStr = getRandomGlitchItem();
                        }
                    }
                    newText += charStr;
                }
                $el.text(newText);
                if(frame > 0){
                    frame--;
                    glitch = setTimeout(function(){
                        replaceText($el,prob__,text,frame)
                    },settings.frameTime);
                }
            };

            $(this).on('mouseenter', function(){
                clearTimeout(deglitch);
                frame = settings.frames;
                replaceText($(this),prob4Str,text, frame);
            });

            $(this).on('mouseleave', function(){
                var $this = $(this);
                clearTimeout(glitch);
                deglitch = setTimeout(function(){
                    $this.text(text);
                }, settings.deglitchTime)
            })

        });
    };
})(jQuery);