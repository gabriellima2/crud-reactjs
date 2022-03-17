function dataInLocalStorage(key, value) {
    const data = localStorage.getItem(key);

    // Insere um novo dado e retorna o valor inicial passado no parâmetro.
    if ( !data ) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
    };

    const aux = JSON.parse(data);
    return aux;
};

export default dataInLocalStorage;
