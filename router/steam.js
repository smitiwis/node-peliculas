import { Router, json } from "express";

const steamRouter = Router();

// CONSTANTES
const apiKey = "D6898510C87B2E34A32FCBDDDCDF2FED";
const steamFriendId = "76561199619562954"; 
const appipdota2 = "570";

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
  const createLobby = `https://partner.steam-api.com/ILobbyMatchmakingService/CreateLobby/v1?key=${apiKey}&appid=${appipdota2}&max_members=10&lobby_type=4&lobby_name=amigos&steamid_invited_members=[]`;

  try {
    const response = await fetch(createLobby, { 
      method: "POST" ,
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await response.json();

    if (response.ok) {
      res.json({
        message: "CREATE LOBBY",
        data
      });
    } else {
      // Maneja el error
      res.status(403).json({
        message: "ERROR AL CREAR LOBBY 1",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "ERROR AL CREAR LOBBY 2",
      error: JSON.stringify(error)
    });
  }
});

export default steamRouter;