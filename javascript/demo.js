

// For each code block, create an editor

var satya = satya || {};

(function ($) {

"use strict";

var examples = {};
    examples.index = 0;
    

$('pre').each(function () {
  var $pre = $(this);
  
  $pre.addClass("runnable").wrap('<div class="run" />');

  var code = $pre.find('code'),
      output, button;
  
  // Check code block for runnable keywords and setup output box
  // and run button.
  if (code.text().indexOf('demoElement') > -1 || code.text().indexOf('alert') > -1) {
    
    examples.index += 1;
    
    code.attr('id', 'code-' + examples.index);
    
    if(!satya.narrowScreen){
      code.attr('contenteditable', true)
    }
    
    output = $('<output>click \'run\' button</output>').attr('id', 'output-' + examples.index);
    button = $('<button class="eval">Run</button>').data({
        output: output,
        index: examples.index
    });

    $(this.parentNode).append(output[0]);
    $(this).append(button[0]);
    
  }else{
    
    $(this).removeClass("runnable");
    
  }
});


// Attach handlers to "Run" buttons
$('button.eval')
.click(function () {
    
    var button = $(this),
        index =  button.data('index'),  
        output = button.data('output');
    
    output.empty();
    setTimeout(function () {
        var demoElement = 'satya.jQuery("#' + output[0].id + '")[0]',
            code  = $('#code-' + index).text(),
            $alert  = 'function (msg) {satya.jQuery("#' + output[0].id + '").append("alert: " + msg + "</br/>");}';

        // Add and remove a class when the code is run.
        output.addClass('loaded');
        setTimeout(function () {
            output.removeClass('loaded');
        }, 1500);
        

        // Execute the code in a custom scope that includes alert() and $output.
        try{
        $.globalEval('(function (demoElement, alert) {\n' + code + '\n})(' + demoElement + ', ' + $alert + ')');
        }catch(e){
          var error = e.message;
          $('#output-' + index).html('error: ' + error);
        }
        
    }, 300);
});

})(satya.jQuery);