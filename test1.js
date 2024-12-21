

let arr = [
    { id: 1 },
    { id: 2 }
]

let bol = arr.includes({ id: 1 })
if (bol) {
    console.log("ok")
} else {
    console.error("err")
}
