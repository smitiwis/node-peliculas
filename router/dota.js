import { Router } from "express";

const dotaRouter = Router();

dotaRouter.get("/", async(req, res) => {
  const request = req.query;
  const iddota = "199504615";
  
  const openDotaApi = `https://api.opendota.com/api/players/${iddota}`;

  try {
    const response = await fetch(openDotaApi);
    const data = await response.json();

    if (response.ok) {
      res.json({
        message: "DOTA",
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

export default dotaRouter;
