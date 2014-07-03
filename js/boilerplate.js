//Filename: boilerplate.js
define([
// These are path alias that we configured in our bootstrap
'jQuery', // lib/jquery/jquery
'Underscore', // lib/underscore/underscore
'Backbone' // lib/backbone/backbone
], function($, _, Backbone){
// Above we have passed in jQuery, Underscore and Backbone
// They will not be accesible in the global scope
return {};
// What we return here will be used by other modules
});
//The first argument of the define function is our dependency array, we can pass in any modules we like in
//the future.