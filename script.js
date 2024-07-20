let items = [];

fetch('items.json')
    .then(response => response.json())
    .then(data => {
        items = data;
    });

document.getElementById('itemInput').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestions = items.filter(item => item.name.toLowerCase().includes(input));
    showSuggestions(suggestions);
});

function showSuggestions(suggestions) {
    const container = document.getElementById('autocomplete-container');
    container.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'autocomplete-suggestion';
        div.textContent = suggestion.name;
        div.onclick = () => {
            document.getElementById('itemInput').value = suggestion.name;
            container.innerHTML = '';
        };
        container.appendChild(div);
    });
}

function generateItemCode() {
    const itemName = document.getElementById('itemInput').value;
    const item = items.find(item => item.name === itemName);

    if (item) {
        const boxData = generateBoxCode(item.hex);
        const resultDiv = document.getElementById('itemResult');
        let resultHTML = `Item: ${itemName}<br><br>`;
        boxData.forEach(data => {
            resultHTML += `${data.boxName}: ${data.boxCode}<br><br>`;
        });
        resultDiv.innerHTML = resultHTML;
    } else {
        document.getElementById('itemResult').textContent = 'Item not found!';
    }
}

function generateBoxCode(hex) {
    const first = hex[2];
    const second = hex[3];
    const third = hex[4];
    const fourth = hex[5];

    const boxCodes = [];

    boxCodes.push({ boxName: 'Box 1', boxCode: '(zFUnDRRn)' });
    boxCodes.push({ boxName: 'Box 2', boxCode: '(……o/E!n[space])' });

    boxCodes.push({ boxName: 'Box 3', boxCode: `(EE[space]…l[lefty '][space][space])` });
    boxCodes.push({ boxName: 'Box 4', boxCode: '(E♀BRm[space][space][space])' });
    boxCodes.push({ boxName: 'Box 5', boxCode: `(${getCharacterForBox5(fourth)}……o[space][space])` });
    boxCodes.push({ boxName: 'Box 6', boxCode: `(EEE${getCharacterForBox6(third)}D!n[space])` });
    let box7Replacement = getCharacterForValue(second, 'CDEF'.includes(third));
    boxCodes.push({ boxName: 'Box 7', boxCode: `(EE${box7Replacement}B!n[space][space])` });
    let box8Replacement = getCharacterForValue(first, 'DEF'.includes(second) || (second === 'C' && 'CDEF'.includes(third)));
    boxCodes.push({ boxName: 'Box 8', boxCode: `(E${box8Replacement}/!n[space][space][space])` });
    boxCodes.push({ boxName: 'Box 9', boxCode: "([righty ']BRm[space][space][space][space])" });
    boxCodes.push({ boxName: 'Box 10', boxCode: '([space][space][space][space][space]…oa)' });
    boxCodes.push({ boxName: 'Box 11', boxCode: '(…o[space][space][space][space][space][space])' });
    boxCodes.push({ boxName: 'Box 12+', boxCode: 'Anything' });

    return boxCodes;
}

function getCharacterForBox5(value) {
    const map = {
        '0': 'F',
        '1': 'G',
        '2': 'H',
        '3': 'I',
        '4': 'J',
        '5': 'K',
        '6': 'L',
        '7': 'M',
        '8': 'N',
        '9': 'O',
        'A': 'P',
        'B': 'Q',
        'C': 'R',
        'D': 'S',
        'E': 'T',
        'F': 'U'
    };

    return map[value.toUpperCase()] || 'F';
}

function getCharacterForBox6(value) {
    const map = {
        '0': 'J',
        '1': 'K',
        '2': 'L',
        '3': 'M',
        '4': 'N',
        '5': 'O',
        '6': 'P',
        '7': 'Q',
        '8': 'R',
        '9': 'S',
        'A': 'T',
        'B': 'U',
        'C': 'F',
        'D': 'G',
        'E': 'H',
        'F': 'I'
    };

    return map[value.toUpperCase()] || 'J';
}

function getCharacterForValue(value, isSpecialCondition) {
    const mapNormal = {
        '0': 'I',
        '1': 'J',
        '2': 'K',
        '3': 'L',
        '4': 'M',
        '5': 'N',
        '6': 'O',
        '7': 'P',
        '8': 'Q',
        '9': 'R',
        'A': 'S',
        'B': 'T',
        'C': 'U',
        'D': 'F',
        'E': 'G',
        'F': 'H'
    };

    const mapSpecial = {
        '0': 'J',
        '1': 'K',
        '2': 'L',
        '3': 'M',
        '4': 'N',
        '5': 'O',
        '6': 'P',
        '7': 'Q',
        '8': 'R',
        '9': 'S',
        'A': 'T',
        'B': 'U',
        'C': 'F',
        'D': 'G',
        'E': 'H',
        'F': 'I'
    };

    const map = isSpecialCondition ? mapSpecial : mapNormal;
    return map[value.toUpperCase()] || 'F';
}

// Tab switching logic
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Initial tab
document.getElementsByClassName('tablink')[0].click();
