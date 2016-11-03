/** ======================================================================= *
 * @desc jQuery $ alternative in native js                                 *
 * @param node selector | :string                                          *
 * @return HTMLnodeElement                                                 *
 * ======================================================================= *
 **/

export class DomManipulator {
    constructor() {}
    id(id) {
        return document.getElementById(id)
    }
    el(el) {
        return document.querySelector(el)
    }
    class (el) {
        return document.getElementsByClassName(elClass)
    }
    tag(el) {
        return document.getElementsByTagName(tag)
    }
    all(el) {
        return document.querySelectorAll(el)
    }
}
