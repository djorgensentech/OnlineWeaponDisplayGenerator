// Get Elements

const lbX = document.getElementById("lbX");
const lbY = document.getElementById("lbY");
const lbZ = document.getElementById("lbZ");
const slSide = document.getElementById("slSide");
const slWeapon = document.getElementById("slWeapon");
const image = document.getElementById("weapon-image-actual");

const output = document.getElementById("command-output");

const copyButton = document.getElementById("bnCopy");

// Event Listeners

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerHTML);
})
lbX.addEventListener("input", () => {
    console.log("X Changed");
    outputCommand();
});
lbY.addEventListener("input", () => {
    console.log("Y Changed");
    outputCommand();
});
lbZ.addEventListener("input", () => {
    console.log("Z Changed");
    outputCommand();
});
slSide.addEventListener("change", () => {
    console.log("Side Select Changed");
    outputCommand();
});
slWeapon.addEventListener("change", () => {
    console.log("Weapon Select Changed");
    console.log(slWeapon.value.toLowerCase());
    image.src = `./src/images/${slWeapon.value.toLowerCase()}.png`;
    outputCommand();
});

// Support Functions

function outputCommand() {
    // try {
        let x = parseInt(lbX.value);
        let y = parseInt(lbY.value);
        let z = parseInt(lbZ.value);

        const facingSide = slSide.value;
        const weaponType = slWeapon.value;

        let anchor = {};
        switch (weaponType) {
            case "trident":
                anchor = TRIDENT_ANCHOR;
                break;
            case "sword":
                anchor = SWORD_ANCHOR;
                break;
            case "mace":
                anchor = MACE_ANCHOR;
                break;
            case "axe":
                anchor = AXE_ANCHOR;
                break;
            case "bow":
                anchor = BOW_ANCHOR;
                break;
        }

        const anchorData = anchor[facingSide];
        console.log("AnchorData:",anchorData)
        console.log("anchor:",anchor)
        x = ((x + 0.5) + anchorData[1]).toFixed(2);
        y = (y + anchor['Y']).toFixed(2);
        z = ((z + 0.5) + anchorData[2])
        const rightArm = anchor['RightArm'];
        const rotation = anchorData[0].toFixed(2);

        command = `
            summon armor_stand ${x} ${y} ${z} {ShowArms:1, Pose:{RightArm:[${rightArm[0].toFixed(2)}f,${rightArm[1].toFixed(2)}f,${rightArm[2].toFixed(2)}f]},Invisible:1,Rotation:[${rotation}f, 0f], Invulnerable:0, NoGravity:1b}
        `;
        output.innerHTML = command;
    // } catch {
        // output.innerHTML = "One of the values is kachow";
    // }
}

// Dictionaries

const TRIDENT_ANCHOR = {
    "-X": [90, 0.68, -0.21],
    "-Z": [180, 0.21, 0.68],
    "+X": [270, -0.68, 0.21],
    "+Z": [0, -0.21, -0.68],
    "Y": -1.35,
    "RightArm": [-90, 240, -0.3]
};
const SWORD_ANCHOR = {
    "-X": [270, 0.96, 0.21],
    "-Z": [0, -0.21, 0.96],
    "+X": [90, -0.96, -0.21],
    "+Z": [180, 0.21, -0.96],
    "Y": -0.75,
    "RightArm": [-279.5, 90, 0]
};
const MACE_ANCHOR = {
    "-X": [270, 0.83, 0.18],
    "-Z": [0, -0.18, 0.83],
    "+X": [90, -0.83, -0.18],
    "+Z": [180, 0.18, -0.83],
    "Y": -1.3,
    "RightArm": [-99.8, 270, 0]
};
const AXE_ANCHOR = {
    "-X": [270, 0.85, 0.17],
    "-Z": [0, -0.17, 0.85],
    "+X": [90, -0.85, -0.17],
    "+Z": [180, 0.17, -0.85],
    "Y": -1.3,
    "RightArm": [-100, 270, 0]
};
const BOW_ANCHOR = {
    "-X": [90, 0.52, -0.2],
    "-Z": [180, 0.2, 0.52],
    "+X": [270, -0.52, 0.2],
    "+Z": [0, -0.2, -0.52],
    "Y": -0.99,
    "RightArm": [180, 80, 85]
};


// Initialize

outputCommand();
