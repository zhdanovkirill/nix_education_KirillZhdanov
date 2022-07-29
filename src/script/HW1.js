const exercises = {
    ex1: fizBuz,
    ex2: factorial,
    ex3: reamPaper,
    ex4: calcApartment,
    ex5: pyramid,
}

function processing(sectionId, isInput = true) {
    if (!sectionId) {
        alert('Something went wrong')
    }
    let inputValue;
    const resultSection = document.getElementById(sectionId);
    if (isInput) {
        inputValue = document.getElementById(`input-${sectionId}`);
        if (!inputValue.value || inputValue.value < 0) {
            alert(`Wrong number ${inputValue.value}`)
            return;
        }
    }
    resultSection.value = '';
    exercises[sectionId](resultSection, inputValue?.value);
}

/** 1 */
function fizBuz(resultSection, count) {
    Array.from({length: count}, (_, i) => i + 1)
        .map((el) => resultSection.value += getFizBuz(el));
}

function getFizBuz(i) {
    return i % 3 === 0 ? 'FizBuz\n' : i % 2 !== 0 ? 'Buz\n' : 'Fiz\n'
}

/** 2 */
function factorial(resultSection, factorial) {
    let result = factorial;
    while (factorial > 1) {
        factorial--;
        result *= factorial;
    }
    resultSection.value = result;
}


/** 3 */
function reamPaper(resultSection) {
    const {paper, paperPerWeek, weeks} = getPaperParams();
    let result = paperPerWeek * weeks / paper;
    resultSection.value = result > result.toFixed() ? Number(result.toFixed()) + 1 : result;
}

function getPaperParams() {
    const sheetsInReamPaperSection = document.getElementById('sheets-in-ream-paper');
    const consumptionPerWeekSection = document.getElementById('consumption-per-week');
    const weeksAmountSection = document.getElementById('weeks-amount');
    return {
        paper: sheetsInReamPaperSection.value > 0 ? sheetsInReamPaperSection.value : 500,
        paperPerWeek: consumptionPerWeekSection.value > 0 ? consumptionPerWeekSection.value : 1200,
        weeks: weeksAmountSection.value > 0 ? weeksAmountSection.value : 8,
    }
}

/** 4 */

function calcApartment(resultSection) {
    const {roomsOnFloor, floors, apartment} = getApartmentParams();

    const calcPorch = apartment / floors / roomsOnFloor;
    const intPorch = toInteger(calcPorch)

    let calcFlor = (apartment / roomsOnFloor) - (floors * intPorch);
    let intFlor = toInteger(calcFlor)

    resultSection.value = `Porch->${calcPorch > intPorch ? 1+intPorch : calcPorch}
                           Floor->${(calcFlor===0) ? floors :(calcFlor > intFlor) ? 1+intFlor : calcFlor}`

    console.log(calcEntranceAndFloor(roomsOnFloor, floors, apartment))
}

function toInteger(value){
    return +(value.toString().split('.')[0])
}

function getApartmentParams() {
    const roomsOnFloor = document.getElementById('rooms-on-floor');
    const floors = document.getElementById('floors');
    const roomNumber = document.getElementById('room-number');
    return {
        roomsOnFloor: roomsOnFloor.value > 0 ? roomsOnFloor.value : 3,
        floors: floors.value > 0 ? floors.value : 9,
        apartment: roomNumber.value > 0 ? roomNumber.value : 456,
    }
}

function calcEntranceAndFloor(amountRoomsOnFloor, amountFloors, apartmentNumber) {
    let amountRoomsOnPorch = amountFloors * amountRoomsOnFloor;
    let calcPorch = 1;
    let amountFloorsOnPorch;
    if (apartmentNumber > amountRoomsOnPorch) {
        while (apartmentNumber > amountRoomsOnPorch) {
            calcPorch = calcPorch + 1;
            amountRoomsOnPorch = amountRoomsOnPorch + (amountFloors * amountRoomsOnFloor);
        }
    }

    while (apartmentNumber < amountRoomsOnPorch) {
        amountRoomsOnPorch = amountRoomsOnPorch - amountRoomsOnFloor;
        if (apartmentNumber < amountRoomsOnPorch + 1) {
            amountFloorsOnPorch = amountFloors - 1;
        }
    }

    return {
        porch: calcPorch,
        floor: amountFloorsOnPorch,
    }
}

/** 5 */
function pyramid(resultSection, size) {
    const cellCount =  size * 2 - 1
    let emptyCount = 0
    let fillCount = cellCount
    for (let i = 0; i < size; i++) {
        let line = [...Array(cellCount).keys()]
            .map((item,j)=>  (j < emptyCount || j >= (emptyCount + fillCount)) ? '-' : '#')
        emptyCount++
        fillCount -= 2
        resultSection.value = line.join('') + '\n' + resultSection.value;
    }
}


