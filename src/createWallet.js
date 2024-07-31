// importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definir a rede
// bitcoin - rede principal - mainnet
// testnet - rede de teste - testenet
const network = bitcoin.networks.testnet  // caso não queria .testnet pode utilizar .bitcoin


//derivação de carteiras HD (carteira determinística)
const path = `m/44'/1'/0'/0`

//  criando o mnemoic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta - par chaves privadas e públicas
let account = root.derivePath(path)
let node = account.derive(0).derive(0)


// Gerando endereços P2PKH, P2SH e Bech32

// P2PKH (Pay-to-PubKey-Hash)
//let p2pkhAddress = bitcoin.payments.p2pkh({
 //   pubkey: node.publicKey,
  //  network: network,
 // }).address;
  
  // P2SH (Pay-to-Script-Hash)
 // let p2shAddress = bitcoin.payments.p2sh({
 //   redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network: network }),
 //   network: network,
 // }).address;
  
 // Bech32 (SegWit)
  let bech32Address = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
  }).address;


// Texto original abandonado
//let btcAddress = bitcoin.payments.p2pkh({
//        pubkey: node.publicKey,
//        network: network,
//}).address

console.log("Carteira gerada")
console.log("Mnemonic: ", mnemonic);
console.log("Endereço: ", bech32Address)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)
