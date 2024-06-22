let generatedNumbers = new Set();
let history = [];

function generateNumbers() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const resultDiv = document.getElementById('result');
    
    if (isNaN(min) || isNaN(max) || isNaN(quantity) || min > max || quantity <= 0) {
        resultDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter valid numbers.';
        return;
    }

    const numbers = [];
    let attempts = 0;
    while (numbers.length < quantity && attempts < 1000) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!generatedNumbers.has(randomNum)) {
            numbers.push(randomNum);
            generatedNumbers.add(randomNum);
        }
        attempts++;
    }
    
    if (numbers.length < quantity) {
        resultDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Unable to generate enough unique numbers within the given range.';
    } else {
        resultDiv.innerHTML = '<i class="fas fa-check-circle"></i> Generated numbers: ' + numbers.join(', ');
        history.push([...numbers]);
        updateHistory();
    }
}

function resetFields() {
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('result').innerHTML = '';
    generatedNumbers.clear();
    history = [];
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((numbers, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Generated numbers: ${numbers.join(', ')} 
        <button onclick="removeHistory(${index})"><i class="fas fa-trash-alt"></i></button>`;
        historyList.appendChild(listItem);
    });
}

function removeHistory(index) {
    const numbersToRemove = history[index];
    numbersToRemove.forEach(num => generatedNumbers.delete(num));
    history.splice(index, 1);
    updateHistory();
}
