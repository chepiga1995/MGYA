const jQuery = require('jquery');
const _ = require('lodash');
const math = require('mathjs');
global._ = _;
global.$ = jQuery;
global.jQuery = jQuery;
require('bootstrap');

let N = 1;
let M = 1;
let X = [
    [1, 1],
    [1, 2],
    [1, 4]
];
let Y = [0, 2, 7];

function getX(i, j) {
    return _.get(X, `${i}.${j}`) || '0';
}

function getY(i) {
    return _.get(Y, `${i}`) || '0';
}

const tableTemplate = _.template(`
<table class="table table-bordered">
    <thead>
        <tr>
            <th>Вхідні параметри</th>
            <% _.range(N).forEach((i) => { %>
                <th>X<%= i + 1 %></th>
            <% }); %>
            <th>Y</th>
        </tr>
    </thead>
    <tbody>
        <% _.range(M).forEach((i) => { %>
            <tr>
                <th scope="row">Спостереження №<%= i + 1 %></th>
                <% _.range(N).forEach((j) => { %>
                    <td><input class="in-table-input" type="number" id="X<%= i %><%= j %>" value="<%= getX(i, j) %>"></td>
                <% }); %>
                <td><input class="in-table-input" type="number" id="Y<%= i %>" value="<%= getY(i) %>"></td>
            </tr>    
        <% }); %>
    </tbody>
</table>
<button type="button" id="calculate" class="btn btn-success center-block">Обрахувати</button>
`);


$('#inputDimensions').submit(inputDimensions);

function inputDimensions(e) {
    e.preventDefault();
    e.stopPropagation();
    N = $('#inputNumberOfX').val() || 1;
    M = $('#inputNumberOfM').val() || 1;
    const templateHTML = tableTemplate({ N, M, getX, getY });
    $('#input-table').html(templateHTML);
    $('#calculate').click(calculate);
}

function calculate(e) {
    e.preventDefault();
    e.stopPropagation();
    X = [];
    Y = [];
    for (let i = 0; i < M; i++) {
        const temp = [];
        for (let j = 0; j < N; j++) {
            temp.push(parseInt($(`#X${i}${j}`).val()))
        }
        X.push(temp);
        Y.push(parseInt($(`#Y${i}`).val()))
    }
    MNK(X, Y);
}


function MNK(A, y) {
    const A_t = math.transpose(A);
    const inverse = math.inv(math.multiply(A_t, A));
    const res = math.multiply(math.multiply(inverse, A_t), y);
    console.log(res);
}

