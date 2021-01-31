// import d3 from "d3"
let body = document.querySelector("body")

body.innerHTML = "hello world"

let data = fetch("insurance.csv")
    .then(file => file.body.getReader().read())
    .then(csv => {
        let decoder = new TextDecoder("utf-8")
        return decoder.decode(csv.value)
    })
    .then(text => d3.csvParse(text))

let chart = async () => {
    let insurance = await data
    let width = 500
    let height = insurance.length * 20

    let ageChart = d3.create("svg")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("width", width)
        .attr("height", height)


    let x = d3.scaleLinear()
        .domain([0, d3.max(insurance.map(person => person.age))])
        .range([0, width])

    let y = d3.scaleBand()
        .domain(d3.range(insurance.length))
        .range([0, height])

    let bar = ageChart.selectAll("g")
        .data(insurance)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${y(i)})`)

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("width", d => x(d.age))
        .attr("height", y.bandwidth() - 1)

    console.log("y.bandwidth", y.bandwidth())

    bar.append("text")
        .attr("fill", "white")
        .attr("x", d => x(d.age) - 25)
        .attr("y", y.bandwidth() / 2.5)
        .attr("dy", "0.35rem")
        .text(value => `${value.age}살`)

    document.querySelector("body").appendChild(ageChart.node())
}

chart();