"use strict";let t=.1,e=1,s=10;module.exports={get stepFloat(){return t},set stepFloat(e){e=parseFloat(e),t=0===e||isNaN(e)?.1:e},get stepInt(){return e},set stepInt(t){t=parseInt(t),e=0===t||isNaN(t)?1:t},get shiftStep(){return s},set shiftStep(t){t=parseInt(t),s=0===t||isNaN(t)?10:t}};