// Timeouts for handling mouseLeave and mouseEnter events to avoid instant reaction when moving mouse fast
var Timeouts;
(function (Timeouts) {
    Timeouts[Timeouts["mouseLeave"] = 150] = "mouseLeave";
    Timeouts[Timeouts["mouseEnterLong"] = 400] = "mouseEnterLong";
    Timeouts[Timeouts["mouseEnterShort"] = 100] = "mouseEnterShort";
})(Timeouts || (Timeouts = {}));
export default Timeouts;
