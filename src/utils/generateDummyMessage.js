const dummyMessages = [
    "Merhaba!",
    "Selam!",
    "Nasılsın?",
    "Bugün hava çok sıcak!",
    "Ben robot değilim.",
    "Bu bir dummy mesajdır.",
    "Bildirim geldi!",
    "Mesajlar geliyor mu?",
];

export function generateDummyMessages() {
    const randomIndex = Math.floor(Math.random() * dummyMessages.length);
    return dummyMessages[randomIndex];
}