// import d3 from "d3"

const { dsv } = require("d3");

let values = [10, 12, 7, 57, 24, 30]
let body = document.querySelector("body")
let chart = () => {
    const div = d3.create("div")

    div.style("font", "10px sans-serif");
    div.style("text-align", "right");
    div.style("color", "white")

    const bar = div.selectAll("div")
    const barUpdate = bar.data(values)
    const barNew = barUpdate.join("div")
    const xScale = d3.scaleLinear().domain([0, d3.max(values)]).range([0, body.offsetWidth])
    barNew.style("background", "steelblue");
    barNew.style("padding", "3px");
    barNew.style("margin", "1px");

    barNew.style("width", d => `${xScale(d)}px`);

    barNew.text(d => d)
    return div.node()
}

let autoChart = () => {
    let width = 420
    let height = values.length * 20

    let x = d3.scaleLinear()
        .domain([0, d3.max(values)]) //  0부터 주어진 값의 최고치까지 표시(x)
        .range([0, width])  // 화면에서 표시할 너비

    let y = d3.scaleBand()
        .domain(d3.range(values.length)) // 주어진 데이터의 범위 표시(y)
        .range([0, height]) // 화면에 표시할 높이

    const svg = d3.create("svg")    // "svg" 엘리먼트 생성
        .attr("width", width)   // 너비 정의
        .attr("height", height) // 높이 정의
        .attr("font-family", "sans-serif") // 글꼴 정의
        .attr("font-size", "10") // 글자 크기 정의
        .attr("text-anchor", "end") // 글자 정렬 정의

    const bar = svg.selectAll("g") // svg 아래에 있는 모든 "g"태그 선택. 없으면 비어있는 "g"태그 생성 
        .data(values) // "g"태그에 values값 매핑
        .join("g") // "svg"아래의 비어있는 "g"를 업데이트
        .attr("transform", (d, i) => `translate(0, ${y(i)})`)

    bar.append("rect") // 모든 "g"태그의 자식으로 "rect"태그 추가
        .attr("fill", "steelblue") // rect 배경색 정의
        .attr("width", x) // 너비 정의
        .attr("height", y.bandwidth() - 1) // 높이 정의(-1은 위쪽 패딩이라고 생각하면 됨.)

    bar.append("text")
        .attr("fill", "white") // 글자색 정의
        .attr("x", d => x(d) - 3) // 해당 블럭 내 텍스트 위치(x) 결정
        .attr("y", y.bandwidth() / 2) //  해당 블럭 내 텍스트 위치(y) 결정
        .attr("dy", "0.35em")
        .text(value => `${value}점`)

    return svg.node()
}

body.appendChild(chart())
body.appendChild(autoChart())