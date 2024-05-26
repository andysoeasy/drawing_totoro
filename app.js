var canvas = document.getElementById("animationCanvas");
var ctx = canvas.getContext("2d");


function radians_to_degree(angle){
    return (Math.PI / 180) * angle
}

function drawing_arc(
    x, 
    y, 
    radius,
    from_angle = 0,
    to_angle = 2 * Math.PI,
    isFilled = 0
){

    /**
     * Функция рисует на холсте дугу, или окружность с центром
     * в (x;y) и радиусом radius. 
     * 
     * Чтобы нарисовать окружность, необходимо задать начальный
     * угол равным 0, а коненый - 2 * Math.PI (в радианах).
     * 
     * Параметр isFilled выполняет двойственный функционал:
     * - если задано значение 0, то рисуется окружность;
     * - если задано значение 1, то рисуется круг(с заливкой).
     */


    let start = from_angle;
    let current_x = x + radius * Math.cos(radians_to_degree(start));
    let current_y = y + radius * Math.sin(radians_to_degree(start));

    ctx.beginPath();

    ctx.moveTo(current_x, current_y);

    while (start <= to_angle){

        current_x = x + radius * Math.cos(start);
        current_y = y + radius * Math.sin(start);

        ctx.lineTo(current_x, current_y);
        
        start += Math.PI / 180;
    }

    ctx.closePath();

    if (isFilled == 0){
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

function quadraticBezier(
    x1, y1,
    x2, y2,
    x3, y3
){

    /**
     * Функция строит квадратичную кривую Безье по
     * трем точкам.
     */

    let start = 0;

    let current_x = (1 - start) ** 2 * x1 + 2 * start * (1 - start) * x2 + start ** 2 * x3;
    let current_y = (1 - start) ** 2 * y1 + 2 * start * (1 - start) * y2 + start ** 2 * y3;

    ctx.beginPath();
    ctx.moveTo(current_x, current_y);

    while(start <= 1){
        current_x = (1 - start) ** 2 * x1 + 2 * start * (1 - start) * x2 + start ** 2 * x3;
        current_y = (1 - start) ** 2 * y1 + 2 * start * (1 - start) * y2 + start ** 2 * y3;

        ctx.lineTo(current_x, current_y);

        start += 0.01;
    }

    ctx.stroke();
    ctx.closePath();
}

function betaSpline(points, color){  
    let oldColor = ctx.fillStyle;
    ctx.beginPath();
    points.splice(0,0,points[0]);
    points.push(points[points.length-1]);
    for(let i = 1; i < points.length - 2; i++){
      let a3 = (-points[i-1].x + 3*points[i].x - 3*points[i+1].x + points[i+2].x) / 6,
          a2 = (points[i-1].x - 2*points[i].x + points[i+1].x) / 2,
          a1 = (-points[i-1].x + points[i+1].x) / 2,
          a0 = (points[i-1].x + 4*points[i].x + points[i+1].x) / 6;
      let b3 = (-points[i-1].y + 3*points[i].y - 3*points[i+1].y + points[i+2].y) / 6,
          b2 = (points[i-1].y - 2*points[i].y + points[i+1].y) / 2,
          b1 = (-points[i-1].y + points[i+1].y) / 2,
          b0 = (points[i-1].y + 4*points[i].y + points[i+1].y) / 6;
      
      for(let t = 0; t <= 1; t += 0.005){
        let x = ((a3 * t + a2) * t + a1) * t + a0;
        let y = ((b3 * t + b2) * t + b1) * t + b0;
        ctx.lineTo(x, y);
      }
    }
    points.splice(points.length-1,1);
    points.splice(0,1);
  
    if(color) { ctx.fillStyle = color; ctx.fill(); }
    ctx.stroke();
    ctx.fillStyle = oldColor;
}

function triangle(
    x1, y1, 
    x2, y2, 
    x3, y3,
    color
){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
}



// for (let i = 0; i < circle.length; i++){
//     drawing_arc(
//         circle[i].x, circle[i].y, 3, 0, Math.PI * 2
//     )
//     ctx.fillText(`${i+1}`, circle[i].x+20, circle[i].y+20);
// }


ctx.strokeStyle = 'black';

var tail = [
    {x: 130, y: 561},
    {x: 116, y: 551},
    {x: 96, y: 523},
    {x: 86, y: 469},
    {x: 84, y: 420},
    {x: 104, y: 345},
    {x: 127, y: 295},
    {x: 151, y: 240},
    {x: 182, y: 184},
    {x: 216, y: 143},
    {x: 260, y: 120},
    {x: 309, y: 115},
    {x: 349, y: 118},
    {x: 398, y: 142},
    {x: 431, y: 192},
    {x: 450, y: 239},
    {x: 469, y: 278},
    {x: 491, y: 330},
    {x: 507, y: 388},
    {x: 510, y: 444},
    {x: 506, y: 505},
    {x: 496, y: 530},
    {x: 478, y: 540},
    {x: 475, y: 540},
    {x: 468, y: 587},
    {x: 447, y: 639},
    {x: 432, y: 674},
    {x: 412, y: 690},
    {x: 376, y: 699},
    {x: 320, y: 699},
    {x: 302, y: 688},
    {x: 269, y: 699},
    {x: 230, y: 699},
    {x: 186, y: 683},
    {x: 157, y: 653},
    {x: 140, y: 617},
    {x: 134, y: 591},
    {x: 129, y: 569},
    {x: 128, y: 562},
    {x: 130, y: 561}
];

var ache = [
    {x: 163, y: 320},
    {x: 165, y: 318},
    {x: 204, y: 296},
    {x: 242, y: 266},
    {x: 282, y: 255},
    {x: 323, y: 252},
    {x: 373, y: 263},
    {x: 414, y: 285},
    {x: 446, y: 309},
    {x: 466, y: 374},
    {x: 478, y: 454},
    {x: 468, y: 546},
    {x: 429, y: 619},
    {x: 378, y: 657},
    {x: 310, y: 679},
    {x: 249, y: 683},
    {x: 210, y: 668},
    {x: 175, y: 635},
    {x: 142, y: 571},
    {x: 130, y: 526},
    {x: 127, y: 492},
    {x: 133, y: 441},
    {x: 143, y: 390},
    {x: 158, y: 344},
    {x: 163, y: 320},
    {x: 165, y: 318}
];

var left_ear = [
    {x: 221, y: 141},
    {x: 219, y: 127},
    {x: 214, y: 111},
    {x: 208, y: 105},
    {x: 205, y: 78},
    {x: 213, y: 52},
    {x: 226, y: 28},
    {x: 232, y: 15},
    {x: 244, y: 44},
    {x: 247, y: 62},
    {x: 249, y: 80},
    {x: 243, y: 105},
    {x: 232, y: 114},
    {x: 239, y: 124}
];

for (let i = 0; i < left_ear.length; i++){
    left_ear[i].y += 10;
}

var right_ear = [
    {x: 346, y: 117},
    {x: 350, y: 100},
    {x: 342, y: 88},
    {x: 341, y: 69},
    {x: 346, y: 49},
    {x: 352, y: 32},
    {x: 359, y: 11},
    {x: 366, y: 34},
    {x: 374, y: 57},
    {x: 379, y: 80},
    {x: 377, y: 95},
    {x: 373, y: 102},
    {x: 367, y: 106},
    {x: 370, y: 115},
    {x: 368, y: 128}
];

for (let i = 0; i < left_ear.length; i++){
    right_ear[i].x += 10;
    right_ear[i].y += 19;
}

var nose = [
    {x: 283, y: 199},
    {x: 302, y: 194},
    {x: 322, y: 193},
    {x: 333, y: 195},
    {x: 342, y: 199},
    {x: 330, y: 204},
    {x: 315, y: 207},
    {x: 303, y: 207},
    {x: 293, y: 204},
    {x: 282, y: 199},

];

for (let i = 0; i < nose.length; i++){
    nose[i].x -= 5;
}

ctx.lineWidth = 3;
ctx.lineCap = 'round';

// Когти

// Левая верхняя лапа
triangle(110, 544, 110, 567, 117, 549, '#181513');
triangle(120, 552, 121, 580, 125, 552, '#181513');

// Правая верхняя лапа
triangle(479, 531, 483, 571, 486, 528, '#181513');
triangle(484, 527, 498, 564, 490, 523, '#181513');
triangle(495, 530, 505, 545, 494, 514, '#181513');

// Левая нижняя
triangle(210, 690, 200, 704, 219, 694, '#181513')
triangle(226, 698, 221, 708, 233, 699, '#181513')
triangle(249, 701, 245, 704, 257, 701, '#181513')

// Правая нижняя
triangle(358, 700, 365, 706, 363, 699, '#181513')
triangle(379, 699, 400, 702, 393, 696, '#181513')
triangle(403, 693, 429, 701, 416, 687, '#181513')


ctx.strokeStyle = "#A5A5A5";
betaSpline(tail, "#A5A5A5");        // Тело
betaSpline(left_ear, "#A5A5A5");    // Левое ухо
betaSpline(right_ear, "#A5A5A5");   // Правое ухо
betaSpline(nose, '#181513');        // Нос

// рот
ctx.strokeStyle = '#181513';
ctx.lineWidth = 1;
quadraticBezier(305, 230, 311, 233, 318, 228);


// глаза
ctx.fillStyle = 'white';
drawing_arc(236, 191, 16, 0, 2 * Math.PI, 1);
drawing_arc(376, 187, 16, 0, 2 * Math.PI, 1);

// зрачки
ctx.fillStyle = 'black';
drawing_arc(236, 191, 6, 0, 2 * Math.PI, 1);
drawing_arc(376, 187, 6, 0, 2 * Math.PI, 1);

// усы
ctx.strokeStyle = '#181513';
ctx.lineWidth = 3;
quadraticBezier(410, 213, 446, 205, 478, 202);
quadraticBezier(415, 224, 456, 223, 500, 221);
quadraticBezier(412, 234, 448, 241, 487, 249);

quadraticBezier(187, 216, 152, 212, 129, 203);
quadraticBezier(184, 234, 145, 234, 118, 234);
quadraticBezier(191, 249, 152, 263, 120, 262);

// Живот
ctx.strokeStyle = '#EEE8AA';
betaSpline(ache, '#EEE8AA');

// Мех на животе
ctx.strokeStyle = '#181513';
ctx.lineWidth = 5;
quadraticBezier(186, 330, 199, 310, 221, 326);
quadraticBezier(249, 321, 257, 300, 275, 312);
quadraticBezier(331, 312, 343, 295, 361, 309);
quadraticBezier(398, 317, 409, 295, 427, 310);
ctx.lineWidth = 6;
quadraticBezier(150, 392, 165, 371, 174, 387);
quadraticBezier(212, 391, 225, 363, 244, 381);
quadraticBezier(298, 383, 313, 355, 334, 378);
ctx.lineWidth = 9;
quadraticBezier(376, 375, 394, 358, 403, 380);
quadraticBezier(431, 394, 448, 364, 461, 390);
