function analyzeURL() {

    let box = document.createElement("div");

    box.innerHTML = `
        <div id="urlInputBox" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75, 25, 65, 0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:500px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="
                    color:#d633a6;
                    margin-bottom:15px;
                ">
                    🔗 Analyze URL
                </h2>

                <p style="
                    color:#745b78;
                    margin-bottom:18px;
                    line-height:1.5;
                ">
                    Enter the suspicious URL below:
                </p>

                <input
                    id="urlInput"
                    type="text"
                    placeholder="https://example.com"
                    style="
                        width:100%;
                        padding:14px;
                        border-radius:12px;
                        border:2px solid #e5a8d2;
                        background:#fff1f7;
                        color:#3b164d;
                        font-size:15px;
                        outline:none;
                        box-sizing:border-box;
                    "
                >

                <p id="urlError" style="
                    display:none;
                    color:#d62828;
                    font-size:14px;
                    margin-top:10px;
                ">
                    ⚠️ Please enter a URL first.
                </p>

                <button onclick="checkURL()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:18px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                        box-shadow:0 7px 18px rgba(214,51,166,0.25);
                    ">
                    🔍 Analyze
                </button>

                <button onclick="document.getElementById('urlInputBox').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:1px solid #e5a8d2;
                        border-radius:12px;
                        background:#fce7f3;
                        color:#a12678;
                        font-size:16px;
                        font-weight:bold;
                    ">
                    ❌ Cancel
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(box);
}


function checkURL() {

    let input = document.getElementById("urlInput");
    let url = input.value.trim();

    if (url === "") {
        document.getElementById("urlError").style.display = "block";
        input.style.borderColor = "#d62828";
        return;
    }

    let riskScore = 0;
    let indicators = [];

    if (!url.startsWith("https://")) {
        riskScore += 20;
        indicators.push("⚠️ Website is not using HTTPS");
    }

    if (url.includes("@")) {
        riskScore += 25;
        indicators.push("⚠️ URL contains @ symbol");
    }

    if (url.includes("-")) {
        riskScore += 10;
        indicators.push("⚠️ URL contains suspicious hyphens");
    }

    if (url.length > 75) {
        riskScore += 15;
        indicators.push("⚠️ URL is unusually long");
    }

    if (riskScore > 100) {
        riskScore = 100;
    }

    let level = "LOW RISK";
    let icon = "🟢";

    if (riskScore >= 60) {
        level = "HIGH RISK";
        icon = "🔴";
    }
    else if (riskScore >= 30) {
        level = "MEDIUM RISK";
        icon = "🟠";
    }

    let indicatorHTML = "";

    if (indicators.length === 0) {
        indicatorHTML = `
            <div style="
                background:#ecfdf5;
                color:#166534;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
            ">
                ✅ No obvious phishing indicators detected.
            </div>
        `;
    }
    else {
        indicators.forEach(function(item) {
            indicatorHTML += `
                <div style="
                    background:#fff1f2;
                    color:#9f1239;
                    padding:12px;
                    border-radius:10px;
                    margin-top:10px;
                ">
                    ${item}
                </div>
            `;
        });
    }

    document.getElementById("urlInputBox").remove();

    let result = document.createElement("div");

    result.innerHTML = `
        <div id="urlResultBox" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75,25,65,0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:500px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="
                    color:#d633a6;
                    margin-bottom:20px;
                ">
                    🛡️ PHISHINGGUARD<br>
                    ANALYSIS
                </h2>

                <div style="
                    background:#fff1f7;
                    padding:15px;
                    border-radius:14px;
                    border:1px solid #f0c4df;
                    margin-bottom:15px;
                ">
                    <h3 style="
                        color:#70205a;
                        margin-bottom:8px;
                    ">
                        Risk Score
                    </h3>

                    <div style="
                        font-size:30px;
                        font-weight:bold;
                        color:#d633a6;
                    ">
                        ${riskScore}/100
                    </div>
                </div>

                <h3 style="
                    color:#70205a;
                    margin-bottom:12px;
                ">
                    ${icon} ${level}
                </h3>

                <hr style="
                    border:none;
                    border-top:1px solid #f0c4df;
                    margin:18px 0;
                ">

                <h3 style="
                    color:#70205a;
                    margin-bottom:10px;
                ">
                    Detected Indicators
                </h3>

                ${indicatorHTML}

                <p style="
                    color:#977b99;
                    font-size:13px;
                    line-height:1.5;
                    margin-top:20px;
                ">
                    ⚠️ This is a heuristic analysis, not a guarantee
                    that a website is safe.
                </p>

                <button onclick="document.getElementById('urlResultBox').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                        box-shadow:0 7px 18px rgba(214,51,166,0.25);
                    ">
                    Close
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(result);
  saveScan("URL", url, riskScore, level);
}
function analyzeMessage() {

    let box = document.createElement("div");

    box.innerHTML = `
        <div id="messageInputBox" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75,25,65,0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:550px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="
                    color:#d633a6;
                    margin-bottom:15px;
                ">
                    📧 Analyze Message
                </h2>

                <p style="
                    color:#745b78;
                    margin-bottom:18px;
                    line-height:1.5;
                ">
                    Paste a suspicious message below:
                </p>

                <textarea
                    id="messageInput"
                    placeholder="Example: Your account has been selected for a reward. Click here to claim..."
                    style="
                        width:100%;
                        height:160px;
                        padding:14px;
                        border-radius:12px;
                        border:2px solid #e5a8d2;
                        background:#fff1f7;
                        color:#3b164d;
                        font-size:15px;
                        resize:none;
                        outline:none;
                        box-sizing:border-box;
                        font-family:Arial,sans-serif;
                    "
                ></textarea>

                <button onclick="messageScanWithAnimation()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:18px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                        box-shadow:0 7px 18px rgba(214,51,166,0.25);
                    ">
                    🔍 Analyze Message
                </button>

                <button onclick="document.getElementById('messageInputBox').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:1px solid #e5a8d2;
                        border-radius:12px;
                        background:#fce7f3;
                        color:#a12678;
                        font-size:16px;
                        font-weight:bold;
                    ">
                    ❌ Cancel
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(box);
}


function checkMessage() {

    let message = document.getElementById("messageInput").value.trim();

    if (message === "") {
        alert("Please enter a message.");
        return;
    }

    let riskScore = 0;
    let indicators = [];

    let lowerMessage = message.toLowerCase();

    if (
        lowerMessage.includes("urgent") ||
        lowerMessage.includes("immediately") ||
        lowerMessage.includes("act now")
    ) {
        riskScore += 20;
        indicators.push("⚠️ Urgent or pressure-based language detected");
    }

    if (
        lowerMessage.includes("password") ||
        lowerMessage.includes("otp") ||
        lowerMessage.includes("verification code")
    ) {
        riskScore += 25;
        indicators.push("⚠️ Message asks for sensitive information");
    }

    if (
        lowerMessage.includes("free") ||
        lowerMessage.includes("reward") ||
        lowerMessage.includes("prize") ||
        lowerMessage.includes("winner")
    ) {
        riskScore += 20;
        indicators.push("⚠️ Suspicious reward or prize language detected");
    }

    if (
        lowerMessage.includes("click here") ||
        lowerMessage.includes("click the link") ||
        lowerMessage.includes("verify now")
    ) {
        riskScore += 20;
        indicators.push("⚠️ Suspicious call-to-action detected");
    }

    if (
        lowerMessage.includes("account suspended") ||
        lowerMessage.includes("account blocked") ||
        lowerMessage.includes("account will be closed")
    ) {
        riskScore += 15;
        indicators.push("⚠️ Possible account-threat language detected");
    }

    if (riskScore > 100) {
        riskScore = 100;
    }

    let level = "LOW RISK";
    let icon = "🟢";

    if (riskScore >= 60) {
        level = "HIGH RISK";
        icon = "🔴";
    }
    else if (riskScore >= 30) {
        level = "MEDIUM RISK";
        icon = "🟠";
    }

    let indicatorHTML = "";

    if (indicators.length === 0) {
        indicatorHTML = `
            <div style="
                background:#ecfdf5;
                color:#166534;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
            ">
                ✅ No obvious phishing indicators detected.
            </div>
        `;
    }
    else {
        indicators.forEach(function(item) {
            indicatorHTML += `
                <div style="
                    background:#fff1f2;
                    color:#9f1239;
                    padding:12px;
                    border-radius:10px;
                    margin-top:10px;
                ">
                    ${item}
                </div>
            `;
        });
    }

    document.getElementById("messageInputBox").remove();

    let result = document.createElement("div");

    result.innerHTML = `
        <div id="messageResultBox" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75,25,65,0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:550px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="
                    color:#d633a6;
                    margin-bottom:20px;
                ">
                    🛡️ MESSAGE ANALYSIS
                </h2>

                <div style="
                    background:#fff1f7;
                    padding:15px;
                    border-radius:14px;
                    border:1px solid #f0c4df;
                    margin-bottom:15px;
                ">

                    <h3 style="
                        color:#70205a;
                        margin-bottom:8px;
                    ">
                        Risk Score
                    </h3>

                    <div style="
                        font-size:30px;
                        font-weight:bold;
                        color:#d633a6;
                    ">
                        ${riskScore}/100
                    </div>

                </div>

                <h3 style="
                    color:#70205a;
                    margin-bottom:12px;
                ">
                    ${icon} ${level}
                </h3>

                <hr style="
                    border:none;
                    border-top:1px solid #f0c4df;
                    margin:18px 0;
                ">

                <h3 style="
                    color:#70205a;
                    margin-bottom:10px;
                ">
                    Detected Indicators
                </h3>

                ${indicatorHTML}

                <p style="
                    color:#977b99;
                    font-size:13px;
                    line-height:1.5;
                    margin-top:20px;
                ">
                    ⚠️ This is a heuristic analysis, not a guarantee
                    that a message is safe.
                </p>

                <button onclick="document.getElementById('messageResultBox').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                        box-shadow:0 7px 18px rgba(214,51,166,0.25);
                    ">
                    Close
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(result);
  saveScan("MESSAGE", "Suspicious message", riskScore, level);
  showProfessionalResult(
    "MESSAGE",
    riskScore,
    level,
    indicators
);
}
function saveScan(type, target, score, level) {
let total = Number(localStorage.getItem("totalScanCount")) || 0;
total++;
localStorage.setItem("totalScanCount", total);
    let history = JSON.parse(localStorage.getItem("phishingHistory")) || [];

    history.unshift({
        type: type,
        target: target,
        score: score,
        level: level,
        time: new Date().toLocaleString()
    });

    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    localStorage.setItem("phishingHistory", JSON.stringify(history));

    displayHistory();
}


function displayHistory() {

    let historyList = document.getElementById("historyList");
    let scanCount = document.getElementById("scanCount");

    if (!historyList) return;

    let history = JSON.parse(localStorage.getItem("phishingHistory")) || [];

    if (scanCount) {
        scanCount.textContent = "Total Scans: " + history.length;
    }

    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">
                🛡️ No scans yet
                <br>
                <small>Your analyzed URLs and messages will appear here.</small>
            </div>
        `;

        return;
    }

    historyList.innerHTML = "";

    history.forEach(function(item) {

        let icon = item.type === "URL" ? "🔗" : "📧";

        let riskClass = "low-risk";

        if (item.level === "MEDIUM RISK") {
            riskClass = "medium-risk";
        }
        else if (item.level === "HIGH RISK") {
            riskClass = "high-risk";
        }

        historyList.innerHTML += `
            <div class="history-item">

                <strong>
                    ${icon} ${item.type}
                </strong>

                <div class="history-target">
                    ${item.target}
                </div>

                <div class="history-details">

                    <span class="risk-badge ${riskClass}">
                        ${item.level}
                    </span>

                    <span class="risk-score">
                        ${item.score}/100
                    </span>

                </div>

                <div class="scan-time">
                    🕐 ${item.time}
                </div>

            </div>
        `;
    });
}


function clearHistory() {

    localStorage.removeItem("phishingHistory");

    displayHistory();
}


window.addEventListener("load", displayHistory);


function analyzeURL2() {

    let box = document.createElement("div");

    box.innerHTML = `
        <div id="urlInputBox2" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75,25,65,0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:500px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="color:#d633a6;margin-bottom:15px;">
                    🔗 Analyze URL
                </h2>

                <p style="
                    color:#745b78;
                    margin-bottom:18px;
                    line-height:1.5;
                ">
                    Enter the suspicious URL below:
                </p>

                <input
                    id="urlInput2"
                    type="text"
                    placeholder="https://example.com"
                    style="
                        width:100%;
                        padding:14px;
                        border-radius:12px;
                        border:2px solid #e5a8d2;
                        background:#fff1f7;
                        color:#3b164d;
                        font-size:15px;
                        outline:none;
                        box-sizing:border-box;
                    "
                >

                <button onclick="checkURL2()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:18px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                    ">
                    🔍 Analyze
                </button>

                <button onclick="document.getElementById('urlInputBox2').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:1px solid #e5a8d2;
                        border-radius:12px;
                        background:#fce7f3;
                        color:#a12678;
                        font-size:16px;
                        font-weight:bold;
                    ">
                    ❌ Cancel
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(box);
}


function checkURL2() {

    let url = document.getElementById("urlInput2").value.trim();

    if (url === "") {
        alert("Please enter a URL.");
        return;
    }

    let riskScore = 0;
    let indicators = [];

    let checkURL = url;

    if (!checkURL.startsWith("http://") &&
        !checkURL.startsWith("https://")) {

        checkURL = "https://" + checkURL;
    }

    let parsedURL;

    try {
        parsedURL = new URL(checkURL);
    }
    catch (error) {
        riskScore += 30;
        indicators.push("⚠️ URL format appears unusual or invalid");
    }

    if (!url.startsWith("https://")) {
        riskScore += 20;
        indicators.push("⚠️ Website is not using HTTPS");
    }

    if (parsedURL) {

        let hostname = parsedURL.hostname.toLowerCase();

        let ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

        if (ipPattern.test(hostname)) {
            riskScore += 20;
            indicators.push("⚠️ URL uses an IP address instead of a domain");
        }

        if (hostname.includes("xn--")) {
            riskScore += 20;
            indicators.push("⚠️ Domain contains encoded/punycode characters");
        }

        if (hostname.split(".").length >= 4) {
            riskScore += 15;
            indicators.push("⚠️ URL contains many subdomains");
        }

        if (url.includes("@")) {
            riskScore += 25;
            indicators.push("⚠️ URL contains @ symbol");
        }

        let hyphens = (hostname.match(/-/g) || []).length;

        if (hyphens >= 2) {
            riskScore += 10;
            indicators.push("⚠️ Domain contains multiple hyphens");
        }

        if (/%[0-9A-Fa-f]{2}/.test(url)) {
            riskScore += 10;
            indicators.push("⚠️ URL contains encoded characters");
        }

        let shorteners = [
            "bit.ly",
            "tinyurl.com",
            "t.co",
            "is.gd",
            "cutt.ly",
            "shorturl.at",
            "ow.ly"
        ];

        if (shorteners.includes(hostname)) {
            riskScore += 15;
            indicators.push("⚠️ URL uses a shortened-link service");
        }
    }

    if (url.length > 75) {
        riskScore += 15;
        indicators.push("⚠️ URL is unusually long");
    }

    if (riskScore > 100) {
        riskScore = 100;
    }

    let level = "LOW RISK";
    let icon = "🟢";

    if (riskScore >= 60) {
        level = "HIGH RISK";
        icon = "🔴";
    }
    else if (riskScore >= 30) {
        level = "MEDIUM RISK";
        icon = "🟠";
    }

    let indicatorHTML = "";

    if (indicators.length === 0) {

        indicatorHTML = `
            <div style="
                background:#ecfdf5;
                color:#166534;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
            ">
                ✅ No obvious phishing indicators detected.
            </div>
        `;

    } else {

        indicators.forEach(function(item) {

            indicatorHTML += `
                <div style="
                    background:#fff1f2;
                    color:#9f1239;
                    padding:12px;
                    border-radius:10px;
                    margin-top:10px;
                ">
                    ${item}
                </div>
            `;

        });
    }

    document.getElementById("urlInputBox2").remove();

    let result = document.createElement("div");

    result.innerHTML = `
        <div id="urlResultBox2" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(75,25,65,0.35);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
            padding:20px;
            box-sizing:border-box;
        ">

            <div style="
                background:#ffffff;
                color:#3b164d;
                width:100%;
                max-width:500px;
                padding:28px;
                border-radius:24px;
                border:2px solid #f0c4df;
                box-shadow:0 15px 40px rgba(142,36,107,0.20);
                box-sizing:border-box;
            ">

                <h2 style="
                    color:#d633a6;
                    margin-bottom:20px;
                ">
                    🛡️ PHISHINGGUARD<br>
                    URL ANALYSIS
                </h2>

                <div style="
                    background:#fff1f7;
                    padding:15px;
                    border-radius:14px;
                    border:1px solid #f0c4df;
                ">

                    <h3 style="color:#70205a;">
                        Risk Score
                    </h3>

                    <div style="
                        font-size:30px;
                        font-weight:bold;
                        color:#d633a6;
                        margin-top:8px;
                    ">
                        ${riskScore}/100
                    </div>

                </div>

                <h3 style="
                    color:#70205a;
                    margin:18px 0 12px;
                ">
                    ${icon} ${level}
                </h3>

                <hr style="
                    border:none;
                    border-top:1px solid #f0c4df;
                ">

                <h3 style="
                    color:#70205a;
                    margin:18px 0 10px;
                ">
                    Detected Indicators
                </h3>

                ${indicatorHTML}

                <p style="
                    color:#977b99;
                    font-size:13px;
                    line-height:1.5;
                    margin-top:20px;
                ">
                    ⚠️ This is a heuristic analysis, not a guarantee
                    that a website is safe.
                </p>

                <button onclick="document.getElementById('urlResultBox2').remove()"
                    style="
                        width:100%;
                        padding:14px;
                        margin-top:10px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#d633a6,#a855f7);
                        color:white;
                        font-size:16px;
                        font-weight:bold;
                    ">
                    Close
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(result);

    saveScan("URL", url, riskScore, level);
  showProfessionalResult(
    "URL",
    riskScore,
    level,
    indicators
);
}
/* ===== RISK DASHBOARD ===== */

function updateDashboard() {

    let history = JSON.parse(localStorage.getItem("phishingHistory")) || [];

    let total = document.getElementById("totalScans");
    let low = document.getElementById("lowScans");
    let medium = document.getElementById("mediumScans");
    let high = document.getElementById("highScans");

    if (!total) return;

    total.textContent = history.length;

    low.textContent = history.filter(function(item) {
        return item.level === "LOW RISK";
    }).length;

    medium.textContent = history.filter(function(item) {
        return item.level === "MEDIUM RISK";
    }).length;

    high.textContent = history.filter(function(item) {
        return item.level === "HIGH RISK";
    }).length;
}


/* ===== RISK CHART UPDATE ===== */

function updateRiskChart() {

    let history = JSON.parse(localStorage.getItem("phishingHistory")) || [];

    let total = history.length;

    let low = history.filter(function(item) {
        return item.level === "LOW RISK";
    }).length;

    let medium = history.filter(function(item) {
        return item.level === "MEDIUM RISK";
    }).length;

    let high = history.filter(function(item) {
        return item.level === "HIGH RISK";
    }).length;

    let lowPercent = total ? Math.round((low / total) * 100) : 0;
    let mediumPercent = total ? Math.round((medium / total) * 100) : 0;
    let highPercent = total ? Math.round((high / total) * 100) : 0;

    document.getElementById("lowBar").style.width = lowPercent + "%";
    document.getElementById("mediumBar").style.width = mediumPercent + "%";
    document.getElementById("highBar").style.width = highPercent + "%";

    document.getElementById("lowPercent").textContent = lowPercent + "%";
    document.getElementById("mediumPercent").textContent = mediumPercent + "%";
    document.getElementById("highPercent").textContent = highPercent + "%";
}

setInterval(updateRiskChart, 500);

window.addEventListener("load", updateRiskChart);
/* ===== PROFESSIONAL RESULT CARD ===== */

function showProfessionalResult(type, score, level, indicators) {

    let oldCard = document.getElementById("professionalResult");

    if (oldCard) {
        oldCard.remove();
    }

    let riskClass = "low";

    if (level === "MEDIUM RISK") {
        riskClass = "medium";
    }
    else if (level === "HIGH RISK") {
        riskClass = "high";
    }

    let action = "The content appears relatively safe, but always verify before taking action.";

    if (level === "MEDIUM RISK") {
        action = "Be cautious. Verify the sender or website before clicking links or sharing information.";
    }

    if (level === "HIGH RISK") {
        action = "Do not click suspicious links or share passwords, OTPs, or personal information.";
    }

    let indicatorText = "No major warning signs detected.";

    if (indicators && indicators.length > 0) {
        indicatorText = indicators.map(function(item) {
            return "• " + item;
        }).join("<br>");
    }

    let card = document.createElement("div");

    card.id = "professionalResult";
    card.className = "result-card";

    card.innerHTML = `
        <div class="result-header">

            <h3>🛡️ ${type} Risk Analysis</h3>

            <div class="risk-score-big">
                ${score}/100
            </div>

        </div>

        <div class="result-status ${riskClass}">
            ${level}
        </div>

        <div class="result-section">

            <h4>🔍 Warning Signs</h4>

            <p>
                ${indicatorText}
            </p>

        </div>

        <div class="result-action">
            💡 Recommended Action:<br><br>
            ${action}
        </div>
    `;

    document.querySelector(".history").before(card);

    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
/* ===== SCANNING ANIMATION ===== */

function startScanAnimation(callback) {

    let overlay = document.getElementById("scanOverlay");
    let progress = document.getElementById("scanProgress");

    if (!overlay || !progress) {
        callback();
        return;
    }

    overlay.style.display = "flex";
    progress.style.width = "0%";

    let value = 0;

    let scanTimer = setInterval(function() {

        value += 10;

        progress.style.width = value + "%";

        if (value >= 100) {

            clearInterval(scanTimer);

            setTimeout(function() {

                overlay.style.display = "none";

                callback();

            }, 200);

        }

    }, 70);
}
/* ===== URL SCAN WITH LOADING ANIMATION ===== */

function runURLScan() {

    startScanAnimation(function() {
        analyzeURL2();
    });

}
/* ===== MESSAGE SCAN WITH LOADING ANIMATION ===== */

function runMessageScan() {

    analyzeMessage();

}
/* ===== MESSAGE ANALYSIS WITH LOADING ===== */

function runMessageAnalysis() {

    startScanAnimation(function() {
        checkMessage();
    });

}
function messageScanWithAnimation() {

    let overlay = document.getElementById("scanOverlay");
    let progress = document.getElementById("scanProgress");

    overlay.style.display = "flex";
    progress.style.width = "0%";

    let value = 0;

    let timer = setInterval(function() {

        value += 10;
        progress.style.width = value + "%";

        if (value >= 100) {

            clearInterval(timer);

            setTimeout(function() {

                overlay.style.display = "none";
                checkMessage();

            }, 200);
        }

    }, 70);
}