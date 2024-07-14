// Objek yang mewakili pemain dengan nama dan kreditnya
let player = {
    name: "Doni",
    credit: 145,
};

// Variabel untuk menyimpan kartu, jumlah total, status blackjack, status permainan, dan pesan
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// Mendapatkan elemen HTML untuk menampilkan pesan, jumlah kartu, dan total sum
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById('sum-el');
let cardsEl = document.getElementById('cards-el');
let playerEl = document.getElementById('player-el');

// Menampilkan informasi pemain pada elemen HTML
playerEl.textContent = player.name + ": $" + player.credit;

/**
 * Mendapatkan kartu acak
 * @returns {number} Kartu acak antara 2 hingga 11
 */
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1; // Menghasilkan angka antara 1 dan 13
    if (randomCard === 1) {
        return 11; // Kartu As bisa bernilai 11
    } else if (randomCard > 10) {
        return 10; // Kartu King, Queen, dan Jack bernilai 10
    } else {
        return randomCard; // Kartu lainnya bernilai sesuai angka
    }
}

/**
 * Mengatur ulang permainan
 */
function resetGame() {
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
    message = "";
    renderGame(); // Merender ulang tampilan permainan
}

/**
 * Memulai permainan baru
 */
function startGame() {
    resetGame(); // Menginisiasi ulang permainan
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards.push(firstCard, secondCard);
    sum = firstCard + secondCard;
    isAlive = true;
    renderGame(); // Merender ulang tampilan permainan
}

/**
 * Merender tampilan permainan
 */
function renderGame() {
    // Menampilkan kartu yang dimiliki pemain
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    // Menampilkan jumlah total kartu
    sumEl.textContent = "Sum: " + sum;

    // Menentukan pesan berdasarkan jumlah total kartu
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You got the Blackjack!!!";
        hasBlackJack = true;
    } else {
        message = "You out of the game :(";
        isAlive = false;
    }

    // Menampilkan pesan pada elemen HTML
    messageEl.textContent = message;
}

/**
 * Menarik kartu baru
 */
function drawCard() {
    // Memastikan pemain masih hidup dan belum mendapatkan blackjack
    if (isAlive === true && hasBlackJack === false) {
        let drawNewCard = getRandomCard();
        cards.push(drawNewCard);
        sum += drawNewCard;
        renderGame(); // Merender ulang tampilan permainan
    }
}

/**
 * Menetapkan status permainan ketika pemain memilih untuk stand
 */
function stand() {
    isAlive = false;
    message = "You choose to stand. Final sum: " + sum;
    messageEl.textContent = message;
}

// Menambahkan event listener untuk tombol START GAME
document.getElementById('btn-start').addEventListener('click', startGame);

// Menambahkan event listener untuk tombol DRAW A NEW CARD
document.getElementById('btn-draw').addEventListener('click', drawCard);

// Menambahkan event listener untuk tombol STAND
document.getElementById('btn-stand').addEventListener('click', stand);