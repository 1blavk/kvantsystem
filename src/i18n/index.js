const modules = import.meta.glob("../locales/*.json", { eager: true });

export const translations = {};
export const languages = [];

for (const path in modules) {
    const langCode = path.split("/").pop().replace(".json", "");
    const data = modules[path];

    translations[langCode] = data;

    languages.push({
        code: langCode,
        name: data.__name || langCode,
    });
}