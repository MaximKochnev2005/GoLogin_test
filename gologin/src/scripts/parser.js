export const parser = (data, delimiters) => {
    let table = [];
    let row = [];
    let login = "";
    let password = "";
    let token = "";
    let cookies = [];
    let notes = [];
    let notes_param = "";

    let pattern = '[' + delimiters.join('\\') + ']';
    let regex = new RegExp(pattern, 'g');
    let dataObject = data.split(regex);
    for(let i = 0; i < dataObject.length; i++){
        if (row.length >= 5){
            table.push(row);
            row = [];
            login = "";
            password = "";
            token = "";
            cookies = [];
            notes = [];
            notes_param = "";
        }

        if (dataObject[i].indexOf("EAA") !== -1){
            token = dataObject[i];
            row.push(token);
        }
        if (dataObject[i].indexOf("@") !== -1 && dataObject[i - 1].indexOf('"') === -1 && dataObject[i + 1].indexOf('"') === -1){
            login = dataObject[i];
            password = dataObject[i + 1];
            notes_param = dataObject[i - 1];
            row.push(login);
            row.push(password);
        }
        if (dataObject[i] === "https") {
            notes.push(dataObject[i]);
            notes.push(dataObject[i + 1]);
            notes.push(notes_param);
            for (let x = i + 1; x < dataObject.length; x++){
                if (dataObject[x].indexOf('[{"domain"') !== -1){
                    break;
                }
                notes.push(dataObject[x]);
            }
            row.push(notes);
        }
        if (dataObject[i] === '[{"domain"') {
            for (let x = i; x < dataObject.length; x++){
                if (dataObject[x].indexOf('}]') !== -1){
                    cookies.push(dataObject[x]);
                    break;
                }
                cookies.push(dataObject[x]);
            }
            row.push(cookies);
        }
    }
    return table;
}