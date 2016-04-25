(function($) {
    //color to r,g,b
    function c2rgb(c) {
        var r = parseInt(c.slice(0, 2), 16),
            g = parseInt(c.slice(2, 4), 16),
            b = parseInt(c.slice(4, 6), 16);
        return [r, g, b];
    }
    //r,g,b to int
    function rgb2i(r, g, b) {
        return r * 65536 + g * 256 + b
    }
    //int to r,g,b
    function i2rgb(i) {
        var bi = (Array(24).join("0") + i.toString(2)).slice(-24);
        var r = parseInt(bi.slice(0, 8), 2),
            g = parseInt(bi.slice(8, 16), 2),
            b = parseInt(bi.slice(16, 24), 2);
        return [r, g, b];
    }
    //rgb to color
    function rgb2c(r, g, b) {
        var hex = [
            r.toString(16),
            g.toString(16),
            b.toString(16)
        ]
        hex.forEach(function(val, idx) {
            if (val.length === 1) {
                hex[idx] = "0" + val;
            }
        })
        return hex.join("").toUpperCase();
    }


    function cal(ifs) {
        var ifs = $.extend(defaultFactors, ifs)
        if (ifs['method'] === 'line') {
            // var rgb = i2rgb(ifs['value']);
            var r = ifs['value'],
                g = r,
                b = r;
            var lv = parseInt(ifs['level']),
                k = parseInt(ifs['step']);
            if (lv % 2) {

                r = r + lv * k;
                g = r + lv * k;
                b = g + lv * k;
            } else {
                r = r - lv * k;
                g = r - lv * k;
                b = g - lv * k;
            }
            console.log(r, g, b)
            return '#' + rgb2c(r, g, b);
        }
    }

    function dive(nd, lv) {
        var children = $(nd).children();
        $.each(children, function(i, child) {
            var ifs = {
                'level': lv,
                'sn': i, //sequence number,
                'area': ($(child).width()) * ($(child).height()),
                'hasText': $(child).text().length > 0
            }
            var color = cal(ifs)
            $(child).css({
                "background-color": color
            })
            dive(child, lv + 1)
        })
    }
    $.rainbow = function(options) {
        $(document.body.appendChild(document.createElement("div")))
            .css({
                "width": "256px",
                "position": "fixed",
                "top": "10px",
                "z-index": 999,
                "opacity": 0.5,
            })
            .slider({
                max: 255,
                slide: function() {},
                change: function() {
                    defaultFactors['value'] = $(this).slider("value");
                    dive(document.body, 1);
                },
            });
    };
    $.star=function(options){

    }

    $.fn.rainbow = function(options) {
        var defaults = {
            'method':'v',
            'width': 600,
            'height': 200,
            'colors': [
                "rgb(255, 0, 0)",
                "rgb(255, 165, 0)",
                "rgb(255, 255, 0)",
                "rgb(0, 255, 0)",
                "rgb(0, 127, 255)",
                "rgb(0, 0, 255)",
                "rgb(139, 0, 255)"
            ]
        }
        var settings = $.extend(defaults, options)
        var svg = document.createElementNS("svg", "svg");
        svg.setAttribute("width", defaults['width']);
        svg.setAttribute("height", defaults['height']);
        if(settings['method']==='arc'){
            settings['colors'].forEach(function(color, idx) {
                var r = document.createElementNS("svg", "path");
                var w = 10,
                height = settings['height'] + 100,
                width = settings['width'];
                var p0x = idx * w + w / 2,
                p0y = height,
                p1x = idx * w + w,
                p1y = idx * w,
                p2x = width - idx * w - w / 2,
                p2y = idx * w,
                p3x = width - idx * w - w,
                p3y = height;
                var d = "M " + p0x + " " + p0y + " C " + [p1x, p1y, p2x, p2y, p3x, p3y].join(" ");
                r.setAttribute("fill", "none");
                r.setAttribute("d", d);
                r.setAttribute("stroke", color);
                r.setAttribute("stroke-width", 10);
                // var path='<path stroke="'+color+'" stroke-width="15" d="'+d+'" fill="none" ></path>';
                svg.appendChild(r);
                // $("#svg").append(r);
            });
        }else if(settings['method']==='h'){
            var n=settings['colors'].length,
                w=settings['width'],
                h=settings['height']/n;
            settings['colors'].forEach(function(color,idx){
                var r = document.createElementNS("svg", "path");
                var d="M0 "+(h*idx+h/2)+" L"+w+" "+(h*idx+h/2);
                console.log(d);
                r.setAttribute("fill", "none");
                r.setAttribute("d", d);
                r.setAttribute("stroke", color);
                r.setAttribute("stroke-width", h);
                svg.appendChild(r);
            });
        }else if(settings['method']==='v'){
            var n=settings['colors'].length,
                w=settings['width']/n,
                h=settings['height'];
            settings['colors'].forEach(function(color,idx){
                var r = document.createElementNS("svg", "path");
                var d="M"+(w*idx+w/2)+" 0 L"+(w*idx+w/2)+" "+h;
                r.setAttribute("fill", "none");
                r.setAttribute("d", d);
                r.setAttribute("stroke", color);
                r.setAttribute("stroke-width", w);
                svg.appendChild(r);
            });
        }else if(setting['method']=='pie'){
            
        }
        else if(setting['method']=='round'){

        }
        else if(setting['method']=='todo'){

        }
        $(this).append(svg);
        $(this).html($(this).html());
    };
}(jQuery));
