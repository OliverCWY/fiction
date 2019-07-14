var webcrabber=(()=>{
  $.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });
  this.getHTML=(url,func)=>{
    var finish=false;
    if(url.substr(0,4)!="http")url="https://"+url;
    $.get(url,func);
  }
  return this;
})();
