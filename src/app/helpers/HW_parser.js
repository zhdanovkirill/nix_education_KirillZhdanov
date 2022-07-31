let exercises = {};

export function setExercises(ex) {
    exercises = ex
}

export function exercisesPars(sectionId, isInput = true) {
    if (!sectionId) {
        alert('Something went wrong')
    }
    let inputValue;
    const resultSection = document.getElementById(sectionId);
    if (isInput) {
        inputValue = document.getElementById(`input-${sectionId}`);
        if (!inputValue.value) {
            alert(`Wrong value`)
            return;
        }
    }
    resultSection.value = '';
    exercises[sectionId](resultSection, inputValue?.value);
}

window.runExercise = exercisesPars;
