 import './header.less';
 let header = {
     init() {
         const _logo = require('./images/logo.png');
         const _greentree = require('./images/greentree.png');
         //document.getElementById('logo').src = _logo;
         document.getElementById('js-greentree').src = _greentree;
     }
 };

header.init();


 export
 default header;