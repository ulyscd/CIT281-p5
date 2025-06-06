document.getElementById("btn-begin").addEventListener("click", async () => {
    document.querySelector(".begin").style.display = "none";
    document.querySelector(".char-containers").style.display = "block";
    document.querySelector(".controls").style.display = "block";
    document.querySelectorAll(".guide").forEach(el => el.style.display = "block");
    document.querySelector(".combat-log").style.display = "block";

    const res = await fetch("/api/state");
    const data = await res.json();
    render(data);
});

document.getElementById("btn-attack").onclick = () => takeAction("atk");
document.getElementById("btn-heal").onclick = () => takeAction("heal");
document.getElementById("btn-defend").onclick = () => takeAction("def");
document.getElementById("btn-next").onclick = async () => {
    disableControls(true);
    const res = await fetch('/api/cpu');
    const data = await res.json();
    render(data);
    disableControls(false);
};

function disableControls(disabled = true) {
    document.querySelectorAll(".hide-after-player-turn").forEach(btn => btn.disabled = disabled);
}

function flashScreen(color) {
    const body = document.body;
    const original = body.style.backgroundColor;
    body.style.backgroundColor = color;

    setTimeout(() => {
        body.style.backgroundColor = original || "";
    }, 150);
}

async function takeAction(action) {
    disableControls(true);
    const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
    });
    const data = await res.json();
    render(data);

    if (data.status === 1) {
        setTimeout(async () => {
            const cpuRes = await fetch('/api/cpu');
            const cpuData = await cpuRes.json();
            render(cpuData);
            disableControls(false);
        }, 1000);
    } else {
        disableControls(false);
    }
}

function render(data) {
    const { p1, p2, result, turn, status } = data;

    const [enemyNameEl, enemyHpEl, enemyMpEl] = [
        document.querySelector('#ch1 .name'),
        document.querySelector('#ch1 .hp'),
        document.querySelector('#ch1 .mana')
    ];
    const [playerNameEl, playerHpEl, playerMpEl] = [
        document.querySelector('#ch2 .name'),
        document.querySelector('#ch2 .hp'),
        document.querySelector('#ch2 .mana')
    ];

    enemyNameEl.textContent = p1.name;
    enemyHpEl.textContent = `${p1.hp}/${p1.hpOrigin} HP`;
    enemyMpEl.textContent = `${p1.mana}/${p1.manaOrigin} MP`;

    playerNameEl.textContent = p2.name;
    playerHpEl.textContent = `${p2.hp}/${p2.hpOrigin} HP`;
    playerMpEl.textContent = `${p2.mana}/${p2.manaOrigin} MP`;

    const log = document.querySelector(".combat-log");
    let actionLine = "";

    if (result?.result) {
        const r = result.result;
        const isPlayerAttacker = r.attacker === p2.name;

        switch (r.type) {
            case 'attack':
                if (r.critical) {
                    flashScreen(isPlayerAttacker ? "yellow" : "red");
                } else {
                    flashScreen(isPlayerAttacker ? "#fdfda0" : "#fcb7b7");
                }
                actionLine = `${r.attacker} attacked ${r.target} for ${r.damage} damage.${r.critical ? " 💥 Critical Hit!" : ""}`;
                break;
            case 'heal':
                flashScreen("limegreen");
                actionLine = `${r.target} healed for ${r.amount} HP.`;
                break;
            case 'defend':
                flashScreen("deepskyblue");
                actionLine = `${r.defender} is defending and increased defense.`;
                break;
            case 'fail':
                actionLine = `⚠️ Action failed: ${r.reason}`;
                break;
        }

        if (r.outcome) {
            actionLine += `<br><strong>🏆 ${r.outcome}</strong>`;
        }
    }

    log.innerHTML += `<br><strong>Turn ${turn || 1}</strong><br>${actionLine}<hr>`;
    log.scrollTop = log.scrollHeight;

    if (status === 0 && result?.result?.outcome) {
        setTimeout(() => {
            alert(`🏆 ${result.result.outcome}`);
        }, 100);
    }
}