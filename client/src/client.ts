import * as anchor from "@project-serum/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";

// 1. Configurer la connexion au devnet
const connection = new anchor.web3.Connection("https://api.devnet.solana.com");

// 2. Charger la wallet locale (généralement .json depuis Solana CLI)
const wallet = anchor.Wallet.local();

// 3. Provider (connexion + wallet)
const provider = new anchor.AnchorProvider(connection, wallet, {});
anchor.setProvider(provider);

// 4. Charger le programme déployé (IDL = fichier JSON généré par Anchor)
const idl = require("./mini_game.json"); // IDL généré après build Anchor
const programId = new PublicKey("Fg6PaFpoGXkYsidMpWxqSWYJzQZ1iKhR8p3kYx3hZf1C"); // à remplacer par ton vrai
const program = new anchor.Program(idl, programId, provider);

(async () => {
  // 5. Créer un compte Character (stocke le perso)
  const characterKeypair = Keypair.generate();

  console.log("Perso account:", characterKeypair.publicKey.toBase58());

  // Appel de la fonction create_character
  await program.methods
    .createCharacter("SenseiBot") // nom du perso
    .accounts({
      character: characterKeypair.publicKey,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([characterKeypair])
    .rpc();

  console.log("✅ Perso créé avec 100 HP !");

  // 6. Attaquer un autre perso
  // Ici, tu dois avoir déjà une autre adresse de perso à attaquer
  const targetCharacter = new PublicKey("ADRESSE_DU_PERSO_CIBLE");

  await program.methods
    .attack(30) // dégâts = 30
    .accounts({
      target: targetCharacter,
    })
    .rpc();

  console.log("⚔️ Attaque envoyée, -30 HP au perso ciblé !");
})();
