let surveys = [];

function addOption() {
    const optionsDiv = document.getElementById("options");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "option";
    input.placeholder = `Варіант ${optionsDiv.children.length + 1}`;
    optionsDiv.appendChild(input);
    optionsDiv.appendChild(document.createElement("br"));
}

function createSurvey() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const options = Array.from(document.getElementsByClassName("option")).map(input => input.value);

    if (title && description && options.every(option => option)) {
        surveys.push({ title, description, options, votes: new Array(options.length).fill(0) });
        document.getElementById("outputMessage").textContent = "Опитування створено!";
        console.log(surveys); // Збереження у консоль
    } else {
        document.getElementById("outputMessage").textContent = "Будь ласка, заповніть усі поля.";
    }
}

function loadSurvey() {
    if (surveys.length === 0) {
        document.getElementById("surveyContainer").textContent = "Немає доступних опитувань.";
        return;
    }

    const survey = surveys[surveys.length - 1];
    const container = document.getElementById("surveyContainer");
    container.innerHTML = `<h2>${survey.title}</h2><p>${survey.description}</p>`;

    survey.options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "surveyOption";
        optionInput.value = index;

        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(option));
        container.appendChild(optionLabel);
        container.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Проголосувати";
    submitButton.onclick = function() {
        const selectedOption = document.querySelector("input[name='surveyOption']:checked");
        if (selectedOption) {
            survey.votes[selectedOption.value]++;
            document.getElementById("resultMessage").textContent = "Дякуємо за ваш голос!";
            console.log(surveys); // Збереження результатів у консоль
        } else {
            alert("Будь ласка, оберіть варіант.");
        }
    };
    container.appendChild(submitButton);
}

if (document.getElementById("surveyContainer")) {
    loadSurvey();
}
