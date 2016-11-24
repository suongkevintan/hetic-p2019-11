//ajax for handlebars
export class loadData {
    constructor(json, cb) {

        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', json, true);
        xobj.onreadystatechange = function() {

            if (xobj.readyState == 4 && xobj.status == "200") {
                if (cb)cb(xobj.responseText);
            }
        };
      xobj.send(null);
      return xobj;
    }
}
