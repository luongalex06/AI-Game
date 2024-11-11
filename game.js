// Define player, enemies, and level progression
let player = {};
let bandit = { 
    name: "Bandit", 
    health: 20, 
    attack: 5, 
    image: "images/bandit.png",
    loot: ["Gold", "Silver", "Potion"]
};

let levelProgress = {
    plains: true,  // Start with plains unlocked
    forest: false,
    cave: false,
    mountain: false,
    castle: false
};

// Player character creation function
document.getElementById('start-game').addEventListener('click', () => {
    const name = document.getElementById('character-name').value;
    const characterClass = document.getElementById('character-class').value;

    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    player = createCharacter(name, characterClass);
    startStory();
});

// Create player character based on selected class
function createCharacter(name, characterClass) {
    const stats = {
        Warrior: { strength: 15, agility: 8, magic: 3, health: 100, image: "images/warrior.png" },
        Mage: { strength: 6, agility: 10, magic: 15, health: 70, image: "images/mage.png" },
        Rogue: { strength: 8, agility: 15, magic: 5, health: 80, image: "images/rogue.png" },
    };

    return {
        name: name,
        characterClass: characterClass,
        ...stats[characterClass],
        inventory: [],
        currentHealth: stats[characterClass].health
    };
}

// Start the game story and first encounter
function startStory() {
    document.getElementById('story').style.display = 'none';
    document.getElementById('character-creation').style.display = 'none';
    document.getElementById('combat-section').style.display = 'block';
    document.getElementById('combat-text').innerText = `${player.name}, a brave ${player.characterClass}, enters the plains where a bandit awaits...`;

    // Display player image
    let playerImage = document.createElement('img');
    playerImage.src = player.image;
    playerImage.alt = player.name;
    playerImage.width = 150;
    document.getElementById('combat-section').prepend(playerImage);

    // Set bandit image
    document.getElementById('combat-img').src = bandit.image;
    document.getElementById('combat-img').alt = bandit.name;

    // Hide the advance button initially
    document.getElementById('advance-combat-button').style.display = 'none';
}

// Attack function for player
function attack() {
    let damage = Math.floor(Math.random() * player.strength) + 1;

    if (bandit.health > 0) {
        bandit.health -= damage;
        bandit.health = Math.max(bandit.health, 0);
        document.getElementById('combat-result').innerText = `You attacked the Bandit for ${damage} damage. The Bandit's health is now ${bandit.health}.`;
    }

    // Check if any enemy is defeated and show the victory screen
    if (bandit.health <= 0) {
        showVictoryScreen();
    } else {
        // Enemy turn after player attack
        enemyTurn();
    }
}

// Enemy attack handling
function enemyTurn() {
    let damage = Math.floor(Math.random() * bandit.attack) + 1;
    player.currentHealth -= damage;
    document.getElementById('combat-result').innerText += `\nThe Bandit attacks you for ${damage} damage. Your health is now ${player.currentHealth}.`;
}

// Show the victory screen
function showVictoryScreen() {
    document.getElementById('combat-section').style.display = 'none';  // Hide combat section
    document.getElementById('victory-screen').style.display = 'block';  // Show victory screen

    // Loot for Bandit
    let loot = bandit.loot;
    document.getElementById('victory-text').innerText = `You have defeated the ${bandit.name}!`;

    document.getElementById('loot-text').innerText = `Loot: ${loot.join(', ')}`;
    
    // Show advance button
    document.getElementById('advance-victory-button').style.display = 'block';

    // Attach event listener to the advance button in the victory screen
    document.getElementById('advance-victory-button').onclick = function() {
        // Hide victory screen and show map section
        document.getElementById('victory-screen').style.display = 'none';
        document.getElementById('map-section').style.display = 'block';

        // Unlock the Forest level after defeating Bandit
        levelProgress.forest = true;
        document.getElementById('forest-button').disabled = false;  // Enable Forest button
    };
}

// Function to enter Forest level
document.getElementById('forest-button').addEventListener('click', () => {
    startCombatWithGoblin();  // Start combat with Goblin in the Forest
});

// Start combat with Goblin
function startCombatWithGoblin() {
    document.getElementById('combat-section').style.display = 'block';
    document.getElementById('combat-text').innerText = `${player.name} enters the forest and encounters a Goblin!`;
    document.getElementById('combat-img').src = goblin.image;
    document.getElementById('combat-img').alt = goblin.name;

    // Hide advance button until combat is finished
    document.getElementById('advance-combat-button').style.display = 'none';
}
