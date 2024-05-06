// let username = "i3C8Y_UWATERLOO_CA_AUT";
// let encodedPassword = "UNYkk7S+VPiPcQDSeZ9hpQ==";

let username = "n5G6Y_GMAIL_COM_AUT";

var uri = "https://authservice.priaid.ch/login";
var secret_key = "Ca23MxSq9z8T4KfNo";
var computedHash = CryptoJS.HmacMD5(uri, secret_key);
var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

let encodedPassword = computedHashString;