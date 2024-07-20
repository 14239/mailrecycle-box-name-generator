// function generatePokemonCode() {
//     const pokemonIndex = document.getElementById('pokemonInput').value.toUpperCase();
//     if (/^[0-9A-F]{4}$/.test(pokemonIndex)) {
//         const boxData = generatePokemonBoxCode(pokemonIndex);
//         const resultDiv = document.getElementById('pokemonResult');
//         let resultHTML = `Pokémon Index: ${pokemonIndex}<br><br>`;
//         boxData.forEach(data => {
//             resultHTML += `${data.boxName}: ${data.boxCode}<br><br>`;
//         });
//         resultDiv.innerHTML = resultHTML;
//     } else {
//         document.getElementById('pokemonResult').textContent = 'Invalid Pokémon index!';
//     }
// }

function generatePokemonCode() {
    const pokemonIndexDecimal = document.getElementById('pokemonInput').value;
    const pokemonIndex = parseInt(pokemonIndexDecimal).toString(16).toUpperCase().padStart(4, '0');

    if (/^[0-9A-F]{4}$/.test(pokemonIndex)) {
        const boxData = generatePokemonBoxCode(pokemonIndex);
        const resultDiv = document.getElementById('pokemonResult');
        let resultHTML = `Pokémon Index: ${pokemonIndex} (Decimal: ${pokemonIndexDecimal})<br><br>`;
        boxData.forEach(data => {
            resultHTML += `${data.boxName}: ${data.boxCode}<br><br>`;
        });
        resultDiv.innerHTML = resultHTML;
    } else {
        document.getElementById('pokemonResult').textContent = 'Invalid Pokémon index!';
    }
}

function generatePokemonBoxCode(hex) {
    const fourth = hex[3];
    const third = hex[2];
    const second = hex[1];
    const first = hex[0];

    const boxCodes = [];

    // Box 1: (*……oGSUn)
    let box1Char = getBox1Char(fourth);
    boxCodes.push({ boxName: 'Box 1', boxCode: `(${box1Char}……oGSUn)` });

    // Box 2: (-…o*D!n )
    let box2Char = getBox2Char(third);
    boxCodes.push({ boxName: 'Box 2', boxCode: `(-…o${box2Char}D!n[space])` });

    // Box 3: (EE*B!n  )
    let box3Char = getBox3Char(third, second);
    boxCodes.push({ boxName: 'Box 3', boxCode: `(EE${box3Char}B!n[space][space])` });

    // Box 4: (E*/!n   )
    let box4Char = getBox4Char(second, third, first);
    boxCodes.push({ boxName: 'Box 4', boxCode: `(E${box4Char}/!n[space][space][space])` });

    boxCodes.push({ boxName: 'Box 5', boxCode: `(k-Po♀1xm)` });
    
    boxCodes.push({ boxName: 'Box 6', boxCode: `(EEE/...Rm[space])` });

    boxCodes.push({ boxName: 'Box 7', boxCode: `(EEE...Rm[space][space])` });

    boxCodes.push({ boxName: 'Box 8', boxCode: `(E[space][space][space][space][space][space][space])` });

    boxCodes.push({ boxName: 'Box 9', boxCode: `(E[space][space][space][space][space][space][space])` });

    boxCodes.push({ boxName: 'Box 10', boxCode: `([space][space][space][space][space]...oa)` });

    boxCodes.push({ boxName: 'Box 11', boxCode: `(...o[space][space][space][space][space][space])` });

    boxCodes.push({ boxName: 'Box 12+', boxCode: `Anything` });


    return boxCodes;
}

function getBox1Char(value) {
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

function getBox2Char(value) {
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

function getBox3Char(third, second) {
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

    const map = 'CDEF'.includes(third) ? mapSpecial : mapNormal;
    return map[second.toUpperCase()] || 'I';
}

function getBox4Char(second, third, first) {
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

    const map = ('DEF'.includes(second) || (second === 'C' && 'CDEF'.includes(third))) ? mapSpecial : mapNormal;
    return map[first.toUpperCase()] || 'I';
}