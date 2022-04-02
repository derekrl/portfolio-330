// actual api calls

export async function detectLanguage(text) {
    // turns out this is useless, only checks for english language

    let form = new FormData();
    form.set('q', text);

    const response = await fetch('https://libretranslate.de/detect', {
        method: 'POST',
        body: form
    });

    return response.json();

}

export async function getTranslation(text, sourceLang, targetLang) {
    let form = new FormData();
    form.set('q', text);
    form.set('source', sourceLang);
    form.set('target', targetLang);

    const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: form
    });

    return response.json();
}
