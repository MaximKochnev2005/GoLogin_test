export const parser = (data, delimiters) => {
    let pattern = '[' + delimiters.join('\\') + ']';
    let regex = new RegExp(pattern, 'g');
    return data.split(regex);
}