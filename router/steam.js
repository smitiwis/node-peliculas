import { Router, json } from "express";
import SteamAuth  from "node-steam-openid";

const steamRouter = Router();

// CONSTANTES
const apiKey = "82156AA840308B5721397D8C573BAD96"; // con la cuenta de retosdota2
const steamFriendId = "76561199619562954"; 
const appipdota2 = "570";


const steam = new SteamAuth({
  realm: "http://localhost:3000/login",     // Site name displayed to users on logon
  returnUrl: "http://localhost:3000",       // Your return route
  apiKey: apiKey                             // Steam API key
});

// ********************************************************
steamRouter.get("/user", async(req, res) => {
  const otracosnulta = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamFriendId}`;

  try {
    const response = await fetch(otracosnulta);
    const data = await response.json();

    if (response.ok) {
      res.json({
        message: "DETALLES DEL USUARIO POR ID_STEAM",
        data
      });
    } else {
      // Maneja el error
      console.error(data.error || "Error desconocido");
    }
  } catch (error) {
    console.error(
      "Error al realizar la solicitud al servidor:",
      error.message
    );
  }
});

// ********************************************************
steamRouter.post("/create-lobby", async(req, res) => {
  const createLobby = `https://partner.steam-api.com/ILobbyMatchmakingService/CreateLobby/v1?key=${apiKey}&appid=${appipdota2}&max_members=10&lobby_type=4&lobby_name=amigos&steamid_invited_members=['${steamFriendId}']`;

  try {
    const response = await fetch(createLobby, { 
      method: "POST" ,
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log("response", response);
    if (response.status === 200) {
      res.json({
        message: "CREATE LOBBY",
        data
      });
    } else {
      // Maneja el error
      res.status(response.status).json({
        message: "ERROR AL CREAR LOBBY 1",
        informacion: response.statusText
      });
    }
  } catch (error) {
    res.status(40).json({
      message: "ERROR AL CREAR LOBBY 2",
      error: JSON.stringify(error)
    });
  }
});

// ********************************************************
steamRouter.get("/auth", async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  return res.redirect(redirectUrl);
});

steamRouter.get("/auth/authenticate", async (req, res) => {
  try {
    const user = await steam.authenticate(req);
    console.log("user", user);
    //...do something with the data
  } catch (error) {
    console.error(error);
  }
});


export default steamRouter;
