var RaphaelAdapter = (function () {
    function RaphaelAdapter() {
    }
    RaphaelAdapter.prototype.init = function (elementId, width, height) {
        this.paper = Raphael(elementId, width, height);
    };
    RaphaelAdapter.prototype.line = function (start, end, arrow, text) {
        var arrowOffset = arrow ? -3 : 0;
        if (start.x > end.x || start.y > end.y) {
            arrowOffset = arrowOffset * -1;
        }
        if (start.x == end.x) {
            end = end.add(0, arrowOffset);
        }
        else if (start.y == end.y) {
            end = end.add(arrowOffset, 0);
        }
        var line = this.paper.path("M" + start.x + "," + start.y + " L" + end.x + "," + end.y);
        if (arrow) {
            line.attr({
                'arrow-end': 'classic-wide-long'
            });
        }
    };
    RaphaelAdapter.prototype.text = function (text, bounds) {
    };
    RaphaelAdapter.prototype.rect = function (start, width, height, text) {
        var el = this.paper.rect(start.x, start.y, width, height);
        var center = start.add(width / 2, height / 2);
        var textEl = this.paper.text(center.x, center.y, text);
        var eltext = this.paper.set([el, textEl]);
    };
    RaphaelAdapter.prototype.ellipse = function (center, width, height, text) {
        var el = this.paper.ellipse(center.x, center.y, width, height);
        var textEl = this.paper.text(center.x, center.y, text);
        var eltext = this.paper.set([el, textEl]);
    };
    return RaphaelAdapter;
})();
exports.__esModule = true;
exports["default"] = RaphaelAdapter;
//# sourceMappingURL=raphaelAdapter.js.map