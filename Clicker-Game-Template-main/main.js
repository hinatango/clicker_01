let weapon = '';
let weaponEffect = '';
let totalClicks = 0;
let playerHP = 100;

const bossPhrases = [
    "なんでこんな簡単なこともできないんだ？",
    "これ、急ぎでやっておいて。",
    "お前のやる気を見せてくれよ。",
    "俺が新人の頃はもっと頑張ってたぞ。",
    "残業するのは当然だろう？",
    "休みなんて取らなくてもいいだろ。",
    "報告が遅いんだよ！",
    "もっと努力が必要だ。",
    "最近の若者は根性がないな。",
    "君はまだまだだな。",
    "仕事は結果がすべてだろ。",
    "こんなことも分からないのか？",
    "お前、やる気あるのか？",
    "ミスするのは成長してない証拠だ。",
    "この仕事、俺の期待に応えてくれよ。",
    "家庭より仕事が大事だろう？",
    "チームのためにもっと頑張れ。",
    "誰にでもできることなんだよ、これ。",
    "今まで何をしていたんだ？",
    "考えが甘いんだよ。"
];

document.getElementById("male-btn").addEventListener("click", function () {
    displayWeaponScreen("男？いいえ、違います。外見は男の形をしていますが、中身はただの汚いモンスターです。人間だと思ってはいけません。");
});

document.getElementById("female-btn").addEventListener("click", function () {
    displayWeaponScreen("女？いいえ、違います。外見は女の形をしていますが、中身はただの汚いモンスターです。人間だと思ってはいけません。");
});

document.getElementById("neutral-btn").addEventListener("click", function () {
    displayWeaponScreen("おや、よく見抜きましたね。そいつは人の形をしますが、中身はただの汚いモンスターです。もはや人ではないのです。");
});

function displayWeaponScreen(message) {
    document.getElementById("top-screen").style.display = "none";
    document.getElementById("weapon-screen").style.display = "block";
    document.getElementById("weapon-text").innerText = message + "\nおや？武器を持っていない？それはいけません。一つ無料でプレゼントしますから、どれか持って行ってください。";
}

document.getElementById("brass-knuckles").addEventListener("click", function () {
    confirmWeapon("メリケンサック", "20%の確率で、ワンクリックの効果が5倍になる");
});

document.getElementById("stun-gun").addEventListener("click", function () {
    confirmWeapon("スタンガン", "20%の確率で相手が攻撃できなくなる");
});

document.getElementById("flamethrower").addEventListener("click", function () {
    confirmWeapon("火炎放射器", "1クリックの効果が2倍になる");
});

function confirmWeapon(selectedWeapon, selectedEffect) {
    document.getElementById("weapon-screen").style.display = "none";
    document.getElementById("weapon-confirm-screen").style.display = "block";
    document.getElementById("selected-weapon-name").innerText = selectedWeapon;
    document.getElementById("selected-weapon-effect").innerText = selectedEffect;

    document.getElementById("yes-btn").onclick = function () {
        weapon = selectedWeapon;
        weaponEffect = selectedEffect;
        startClickerGame();
    };

    document.getElementById("no-btn").onclick = function () {
        document.getElementById("weapon-confirm-screen").style.display = "none";
        document.getElementById("weapon-screen").style.display = "block";
    };
}

let monsterHP = 20;
let monsterCount = 0;

function startClickerGame() {
    document.getElementById("weapon-confirm-screen").style.display = "none";
    document.getElementById("clicker-screen").style.display = "block";
    document.getElementById("weapon-name").innerText = weapon;
    document.getElementById("weapon-effect").innerText = weaponEffect;
    document.getElementById("player-hp").innerText = playerHP;
    document.getElementById("monster-hp").innerText = monsterHP;

    updateBossPhrase();

    document.getElementById("monster-img").addEventListener("click", function () {
        if (monsterHP > 0) {
            let damage = 1;
            totalClicks++;

            if (weapon === 'メリケンサック' && Math.random() < 0.2) {
                damage *= 5;
            } else if (weapon === '火炎放射器') {
                damage *= 2;
            }

            if (weapon === 'スタンガン' && Math.random() < 0.2) {
                damage = 0; // スタンガンの効果により攻撃が無効化
            }

            monsterHP -= damage;
            if (monsterHP <= 0) {
                monsterCount++;
                document.getElementById("monster-count").innerText = monsterCount;
                document.getElementById("boss-phrase").innerText = "ぬわぁーーー！";
            }

            document.getElementById("monster-hp").innerText = Math.max(monsterHP, 0);
            document.getElementById("total-clicks").innerText = totalClicks;
        } else {
            // モンスターが倒された後、クリックでHPをリセット
            monsterHP = 20;
            document.getElementById("monster-hp").innerText = monsterHP;
            updateBossPhrase();
        }
    });
}

function updateBossPhrase() {
    const randomIndex = Math.floor(Math.random() * bossPhrases.length);
    const bossPhraseElement = document.getElementById("boss-phrase");
    bossPhraseElement.innerText = bossPhrases[randomIndex];
    bossPhraseElement.style.color = "red";
    bossPhraseElement.style.fontSize = "1.5em";
}
