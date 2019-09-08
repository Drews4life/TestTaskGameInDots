export const objectSize = obj => {
    let size = 0
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++
        }
    }
    return size;
}

export const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const defineColorForItem = (won, failed, active) => {
    if(won) return "lightGreen"
    else if(failed) return "#E85A5F"
    else if(active) return "lightBlue"
    else return "white"
}

export const formatDate = () => {
    const date = new Date()
    const day = addDigit(date.getDate())
    const month = addDigit(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = addDigit(date.getHours())
    const minutes = addDigit(date.getMinutes())
    const seconds = addDigit(date.getSeconds())

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

const addDigit = num => {
    if(`${num}`.length === 1) { return `0${num}`}
    else return num
}