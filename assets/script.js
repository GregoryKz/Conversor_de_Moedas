const RATES = {
    BRL: {
        USD: 1 / 5.50,
        EUR: 1 / 6.00,
        GBP: 1 / 7.00,
        JPY: 1 / 0.038,
        ARS: 1 / 0.0063,
        CAD: 1 / 4.00,
        AUD: 1 / 3.50,
        CNY: 1 / 0.80
    },

    USD: {
        BRL: 5.50,
        EUR: 5.50 / 6.00,
        GBP: 5.50 / 7.00,
        JPY: 5.50 / 0.038,
        ARS: 5.50 / 0.0063,
        CAD: 5.50 / 4.00,
        AUD: 5.50 / 3.50,
        CNY: 5.50 / 0.80
    },

    EUR: {
        BRL: 6.00,
        USD: 6.00 / 5.50,
        GBP: 6.00 / 7.00,
        JPY: 6.00 / 0.038,
        ARS: 6.00 / 0.0063,
        CAD: 6.00 / 4.00,
        AUD: 6.00 / 3.50,
        CNY: 6.00 / 0.80
    },

    GBP: {
        BRL: 7.00,
        USD: 7.00 / 5.50,
        EUR: 7.00 / 6.00,
        JPY: 7.00 / 0.038,
        ARS: 7.00 / 0.0063,
        CAD: 7.00 / 4.00,
        AUD: 7.00 / 3.50,
        CNY: 7.00 / 0.80
    },

    JPY: {
        BRL: 0.038,
        USD: 0.038 / 5.50,
        EUR: 0.038 / 6.00,
        GBP: 0.038 / 7.00,
        ARS: 0.038 / 0.0063,
        CAD: 0.038 / 4.00,
        AUD: 0.038 / 3.50,
        CNY: 0.038 / 0.80
    },

    ARS: {
        BRL: 0.0063,
        USD: 0.0063 / 5.50,
        EUR: 0.0063 / 6.00,
        GBP: 0.0063 / 7.00,
        JPY: 0.0063 / 0.038,
        CAD: 0.0063 / 4.00,
        AUD: 0.0063 / 3.50,
        CNY: 0.0063 / 0.80
    },

    CAD: {
        BRL: 4.00,
        USD: 4.00 / 5.50,
        EUR: 4.00 / 6.00,
        GBP: 4.00 / 7.00,
        JPY: 4.00 / 0.038,
        ARS: 4.00 / 0.0063,
        AUD: 4.00 / 3.50,
        CNY: 4.00 / 0.80
    },

    AUD: {
        BRL: 3.50,
        USD: 3.50 / 5.50,
        EUR: 3.50 / 6.00,
        GBP: 3.50 / 7.00,
        JPY: 3.50 / 0.038,
        ARS: 3.50 / 0.0063,
        CAD: 3.50 / 4.00,
        CNY: 3.50 / 0.80
    },

    CNY: {
        BRL: 0.80,
        USD: 0.80 / 5.50,
        EUR: 0.80 / 6.00,
        GBP: 0.80 / 7.00,
        JPY: 0.80 / 0.038,
        ARS: 0.80 / 0.0063,
        CAD: 0.80 / 4.00,
        AUD: 0.80 / 3.50
    }
};

const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const amountIn = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");
const resultEl = document.getElementById("result");
const rateInfo = document.getElementById("rate-info");
const statusEl = document.getElementById("status");
const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-btn");
const copyBtn = document.getElementById("copy-btn");
const popularChips = document.getElementById("popular-chips");

const POPULAR = ["USD", "BRL", "EUR", "GBP", "JPY", "ARS", "CAD", "AUD", "CNY"];

function showStatus(msg, loading = false) {
    if (!msg) {
        statusEl.innerHTML = "";
        return;
    }
    statusEl.innerHTML = (loading ? '<span class="loader"></span>' : "") + msg;
}

function loadSymbols() {
    const symbols = {};
    Object.keys(RATES).forEach(code => {
        symbols[code] = { description: "Moeda " + code };
    });
    return symbols;
}

function populateSelects(symbols) {
    const entries = Object.entries(symbols).sort((a, b) => a[0].localeCompare(b[0]));

    entries.forEach(([code, info]) => {
        const opt1 = new Option(`${code} — ${info.description}`, code);
        const opt2 = new Option(`${code} — ${info.description}`, code);

        fromSelect.add(opt1);
        toSelect.add(opt2.cloneNode(true));
    });

    fromSelect.value = "BRL";
    toSelect.value = "USD";

    POPULAR.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "chip";
        btn.textContent = c;
        btn.onclick = () => (toSelect.value = c);
        popularChips.appendChild(btn);
    });
}

function convert() {
    const amount = parseFloat(amountIn.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount || amount <= 0) {
        showStatus("Informe um valor maior que 0.");
        return;
    }

    showStatus("Convertendo...", true);

    setTimeout(() => {
        const rate = RATES[from][to];

        if (!rate) {
            showStatus("Conversão não disponível.");
            return;
        }

        const result = amount * rate;

        resultEl.textContent = `${amount.toLocaleString("pt-BR")} ${from} → ${result.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        })} ${to}`;

        rateInfo.textContent = `1 ${from} = ${rate.toFixed(6)} ${to} • (Offline)`;

        showStatus("");
    }, 250);
}


swapBtn.onclick = () => {
    const tmp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tmp;
};

convertBtn.onclick = convert;

clearBtn.onclick = () => {
    amountIn.value = "";
    resultEl.textContent = "—";
    rateInfo.textContent = "Taxa: — • Atualizado: —";
    statusEl.innerHTML = "";
};

copyBtn.onclick = () => {
    navigator.clipboard.writeText(resultEl.textContent);
    showStatus("Copiado!");
    setTimeout(() => showStatus(""), 1500);
};

populateSelects(loadSymbols());