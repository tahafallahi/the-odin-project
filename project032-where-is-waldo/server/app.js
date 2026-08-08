import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  let { name, x, y } = req.query;

  x = Number(x);
  y = Number(y);

  switch (name) {
    case "Robo Brain":
      if (394 < x && x < 439 && 498 < y && y < 525) {
        res.json({ location: true });
      } else {
        res.json({ location: false });
      }
      break;
    case "Guts":
      if (441 < x && x < 529 && 862 < y && y < 924) {
        res.json({ location: true });
      } else {
        res.json({ location: false });
      }
      break;

    case "God of War":
      if (428 < x && x < 491 && 300 < y && y < 334) {
        res.json({ location: true });
      } else {
        res.json({ location: false });
      }
      break;
    case "Waldo":
      if (129 < x && x < 173 && 623 < y && y < 659) {
        res.json({ location: true });
      } else {
        res.json({ location: false });
      }
      break;
    case "Sonic":
      if (703 < x && x < 748 && 659 < y && y < 696) {
        res.json({ location: true });
      } else {
        res.json({ location: false });
      }
      break;
    default:
      res.json({ location: false });
      break;
  }
});

app.listen(3333, () => {
  console.log("listening on port 3333.");
});
