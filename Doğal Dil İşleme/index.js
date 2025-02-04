const { NlpManager } = require("node-nlp");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const manager = new NlpManager({ languages: ["tr"], forcedNER: true });

// Modeli eğitiyoruz, istediğinizi yazabilirsiniz.
manager.addDocument("tr", "gidiyorum", "gorusuruz.bay");
manager.addDocument("tr", "kapatıyorum", "gorusuruz.bay");
manager.addDocument("tr", "merhaba", "selamlama.selam");
manager.addDocument("tr", "selam", "selamlama.selam");
manager.addDocument("tr", "nasılsın", "selamlama.nasilsin");
manager.addDocument("tr", "naber", "selamlama.nasilsin");
manager.addDocument("tr", "ne haber", "selamlama.nasilsin");

// Modelin vereceği cevapları ayarladık.
manager.addAnswer("tr", "gorusuruz.bay", "Görüşmek üzere!");
manager.addAnswer("tr", "gorusuruz.bay", "Kendine dikkat et!");
manager.addAnswer("tr", "selamlama.nasilsin", "Harikayım. Sen nasılsın?");
manager.addAnswer("tr", "selamlama.selam", "Merhaba");

(async () => {
  await manager.train(); // model.nlp dosyasını oluşturttuk.
  manager.save(); // model.nlp dosyasını kaydettik.

  rl.question("Yapay Zekaya Sor: ", async (question) => {
    // Girdi aldık.
    const response = await manager.process("tr", question); // Girdiyi işledik.
    console.log("Cevap: " + response.answer); // Cevabını yazdırdık.
    rl.close();
  });
})();
