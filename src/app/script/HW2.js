const exercises = {
    ex1: ObjectToArray,
    ex2: getArray,
    ex3: getNamesOfDays,
    ex4: calcApartment,
    ex5: bin2dec,
}
export {exercises}


/** 1 */

const inputExample = `{ "Киев": "Украина",  "Нью-Йорк": "США",  "Вена": "Австрия"}`;

function ObjectToArray(resultSection, input) {
    let inputObj = JSON.parse(input)
    if (typeof inputObj !== 'object') {
        alert(`Something went wrong.'${input}' - input should be - ${inputExample}  `)
        return
    }
    /**
     Example 0
     */
    let result = [];
    for (const item in inputObj) {
        result.push(`${item} - ${inputObj[item]}`);
    }
    console.log(result)
    /**
     Example 1
     */
    result = []
    for (const [key, value] of Object.entries(inputObj)) {
        result.push(`${key} - ${value}`);
    }
    console.log(result)
    /**
     Example 2
     */
    resultSection.value = Object.entries(inputObj).map(([k, v]) => `${k} - ${v}`)
}

/** 2 */

function getArray(resultSection, input) {
    if (typeof +input !== 'number' || input % 3 !== 0) {
        alert(`Something went wrong. Value should be number and multiple 3`)
        return
    }
    let bArray = []
    let aArray = []
    Array.from({length: input}).map((v, i) => {
        bArray.push(++i)
        if (i % 3 === 0) {
            aArray.push(bArray)
            bArray = [];
        }
    })
    resultSection.value = JSON.stringify(aArray);
}

/** 3 */
const namesOfDays = {
    ua: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'],
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    de: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
}
const languageValidator = ['ua', 'ru', 'de', 'en']

function getNamesOfDays(resultSection) {
  const {ln, day} = ex3Validator();
    resultSection.value = namesOfDays[ln][day]
}

function ex3Validator() {
    const dayInput = document.getElementById('input-day');
    const ln = document.getElementById('input-ln');
    let day = +dayInput.value;
    let result = {ln: ln.value, day: --day}

    if (typeof result.day !== "number") {
        alert(`Wrong value ${result.day}'. Should be - number from 1 to 7`)
        return result;
    }
    if (result.day > 6) {
        result.day = 6
    }
    if (result.day < 0) {
        result.day = 0
    }
    if (!languageValidator.includes(ln.value)) {
        alert(`Wrong value - '${ln.value}'. Support only 'ua', 'ru', 'de', 'en' languages. `)
        return result;
    }
    return result;
}


/** 4 */

function calcApartment(resultSection, input) {
    let array = ex4Validator(JSON.parse(input));

    /**
     Example 0
     */
    let one = array[0]
    let two = array[1]
    if (one > two) {
        two = one;
        one = array[1];
    }
    console.log(one, two)
    for (let i = 0; i < array.length; i++) {
        if (array[i] === one || array[i] === two) {
            continue;
        }
        if (array[i]<one) {
            console.log(one, two)
            two = one;
            one = array[i];
        } else if (array[i] < two) {
            two = array[i];
        }
    }
    console.log(one, two)
    resultSection.value = 'example0 -> ' + (one + two);

    /**
     Example 1
     */
    let min1 = Math.min(...array);
    array.splice(array.indexOf(min1), 1);
    let min2 = Math.min(...array);
    resultSection.value += '\nexample1 -> ' + (min1 + min2);
}

function ex4Validator(array) {
    const defaultValue = [19, 5, 42, 2, 77];
    if(!Array.isArray(array)){
        alert(`Not array. Calc default value [19, 5, 42, 2, 77]`);
        return defaultValue;
    }

    if(array.length < 4){
        alert(`Min array length 4. Calc default value [19, 5, 42, 2, 77]`);
        return defaultValue;
    }
// todo: bad example. how update it?
    if (array.findIndex((el) => el < 0) > 0) {
        alert(`Only positive values. Calc default value [19, 5, 42, 2, 77]`);
        return defaultValue;
    }
    if (array.findIndex((el) => el % 1 === 0) > 0) {
        alert(`Only whole numbers. Calc default value [19, 5, 42, 2, 77]`);
        return defaultValue;
    }
/*    if (array.findIndex((v, i, a) => a.indexOf(v) === i)>0) {
        alert(`Only unique numbers. Calc default value [19, 5, 42, 2, 77]`);
        return defaultValue;
    }*/

    return array;
}

/** 5 */


function bin2dec(resultSection, num){

     /**
     Example 0
     */
     resultSection.value = 'example0 -> '+ parseInt(num, 2)

     /**
     Example 1
     */

    resultSection.value += '\nexample1 -> ' +
        num.split('').reverse().reduce(((x, y, i)=> (y === '1') ? x + Math.pow(2, i) : x), 0);
}

