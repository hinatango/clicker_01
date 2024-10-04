let selectedJob = '';
let enemyHP = 10;
let playerHP = 20;
let clickCount = 0;

function selectJob(job) {
    selectedJob = job;
    document.getElementById('job-selection').style.display = 'none';
    document.getElementById('clicker-game').style.display = 'block';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('enemy-hp').innerText = `Enemy HP: ${enemyHP}`;
    document.getElementById('player-hp').innerText = `Your HP: ${playerHP}`;
}

function clickEnemy() {
    let damage = 1;

    // 職業特有の能力発動判定
    if (selectedJob === 'Wizard' && Math.random() < 0.3) {
        damage *= 2; // ウィザードの会心
        console.log("Critical hit! Damage doubled.");
    } else if (selectedJob === 'Rogue' && Math.random() < 0.1) {
        damage += 1; // ローグの自動クリック
        console.log("Auto-click activated! Extra damage.");
    }

    enemyHP -= damage;

    // 敵のHPが0以下の場合、新しい敵の出現
    if (enemyHP <= 0) {
        console.log("Enemy defeated!");
        enemyHP = 10; // 新しい敵のHPを設定
    }

    clickCount++;

    // 5クリックに1回、敵が攻撃する
    if (clickCount % 5 === 0) {
        enemyAttack();
    }

    updateDisplay();
}

function enemyAttack() {
    // ウォリアーのシールド発動判定
    if (selectedJob === 'Warrior' && Math.random() < 0.3) {
        console.log("Shield activated! Enemy attack blocked.");
    } else {
        playerHP -= 5;
        console.log("Enemy attack! You took 5 damage.");
    }

    // プレイヤーのHPが0以下ならゲームオーバー
    if (playerHP <= 0) {
        alert("Game Over! You have been defeated.");
        resetGame();
    }
}

function resetGame() {
    // ゲームリセット
    selectedJob = '';
    enemyHP = 10;
    playerHP = 20;
    clickCount = 0;
    document.getElementById('job-selection').style.display = 'block';
    document.getElementById('clicker-game').style.display = 'none';
    updateDisplay();
}