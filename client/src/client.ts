import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

(async () => {
  // Connexion au cluster devnet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Adresse bidon pour test (remplace par la tienne si tu veux)
  const pubkey = new PublicKey("4Nd1m8Q2wXo3C3uV7sUq5dAtdQuGLCUb3u2jXoX3tG9A");

  // Récupérer le solde
  const balance = await connection.getBalance(pubkey);
  console.log(`Solde du compte ${pubkey.toBase58()} : ${balance / 1e9} SOL`);
})();
