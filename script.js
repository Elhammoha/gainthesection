let totalCoins = 0;
let btcBalance = 0;
let ethBalance = 0;
let bnbBalance = 0;
let xrpBalance = 0;
let trxBalance = 0;
const userId = "123456"; // Example user ID, replace with actual Telegram user ID

document.addEventListener("DOMContentLoaded", () => {
    const coinCounter = document.getElementById("coin-counter");
    const btcBalanceDisplay = document.getElementById("btc-balance");
    const ethBalanceDisplay = document.getElementById("eth-balance");
    const bnbBalanceDisplay = document.getElementById("bnb-balance");
    const xrpBalanceDisplay = document.getElementById("xrp-balance");
    const trxBalanceDisplay = document.getElementById("trx-balance");
    const coinSound = document.getElementById("coin-sound");
    const gameContainer = document.getElementById("game-container");

    const logos = [
        { symbol: "btc", url: "url('https://cryptologos.cc/logos/bitcoin-btc-logo.png')", value: 1 },
        { symbol: "eth", url: "url('https://cryptologos.cc/logos/ethereum-eth-logo.png')", value: 0.8 },
        { symbol: "bnb", url: "url('https://cryptologos.cc/logos/binance-coin-bnb-logo.png')", value: 0.3 },
        { symbol: "xrp", url: "url('https://cryptologos.cc/logos/xrp-xrp-logo.png')", value: 0.001 },
        { symbol: "trx", url: "url('https://cryptologos.cc/logos/tron-trx-logo.png')", value: 0.0001 }
    ];

    // Create initial logos
    logos.forEach(logo => createLogo(gameContainer, logo.symbol, logo.url, logo.value));

    // Add new logos every 3 seconds
    setInterval(() => {
        logos.forEach(logo => createLogo(gameContainer, logo.symbol, logo.url, logo.value));
    }, 3000);

    function createLogo(container, symbol, url, value) {
        const logo = document.createElement("div");
        logo.className = "logo " + symbol;
        logo.style.backgroundImage = url;
        logo.dataset.value = value;
        logo.addEventListener("click", (event) => {
            const coinValue = parseFloat(logo.dataset.value);
            totalCoins += coinValue;
            updateBalance(symbol, coinValue);
            coinCounter.innerText = `Total Coins: ${totalCoins.toFixed(4)}`;
            playCoinSound();
            logo.remove();
            createLogo(container, symbol, url, value);
        });
        container.appendChild(logo);
        moveLogo(logo, container);
    }

    function moveLogo(logo, container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        let x = Math.random() * (containerWidth - logoWidth);
        let y = Math.random() * (containerHeight - logoHeight);

        let dx = (Math.random() - 0.5) * 10; // Change in x direction
        let dy = (Math.random() - 0.5) * 10; // Change in y direction

        setInterval(() => {
            if (x + dx < 0 || x + dx + logoWidth > containerWidth) {
                dx = -dx;
            }
            if (y + dy < 0 || y + dy + logoHeight > containerHeight) {
                dy = -dy;
            }
            x += dx;
            y += dy;
            logo.style.left = `${x}px`;
            logo.style.top = `${y}px`;
        }, 100);
    }

    function updateBalance(symbol, value) {
        if (symbol === "btc") {
            btcBalance += value;
            btcBalanceDisplay.innerText = `BTC Balance: ${btcBalance.toFixed(4)}`;
        } else if (symbol === "eth") {
            ethBalance += value;
            ethBalanceDisplay.innerText = `ETH Balance: ${ethBalance.toFixed(4)}`;
        } else if (symbol === "bnb") {
            bnbBalance += value;
            bnbBalanceDisplay.innerText = `BNB Balance: ${bnbBalance.toFixed(4)}`;
        } else if (symbol === "xrp") {
            xrpBalance += value;
            xrpBalanceDisplay.innerText = `XRP Balance: ${xrpBalance.toFixed(4)}`;
        } else if (symbol === "trx") {
            trxBalance += value;
            trxBalanceDisplay.innerText = `TRX Balance: ${trxBalance.toFixed(4)}`;
        }
    }

    function playCoinSound() {
        coinSound.currentTime = 0;
        coinSound.play();
    }
});