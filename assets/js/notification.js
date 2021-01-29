
if(flash.success && flash.success.length > 0) { 
new Noty({
theme:'bootstrap-v4',
text:'<%= flash.success %>',
type:'success',
layout:'top',
container:'.main',
progressBar:false,
timeout:1500

}).show();
}


if(flash.error && flash.error.length > 0) { 
new Noty({
theme:'bootstrap-v4',
text:'<%= flash.error %>',
type:'error',
layout:'top',
container:'.main',
progressBar:false,
timeout:1500

}).show();
}